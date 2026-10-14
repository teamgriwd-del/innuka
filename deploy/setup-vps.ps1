<#
  setup-vps.ps1  -  one-shot deploy of the Innuka website onto a Windows Server VPS.

  HOW TO USE (inside your RDP session on the VPS):
    1. Open PowerShell as Administrator  (right-click > Run as administrator)
    2. Allow this script to run for the session:
         Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
    3. Run it:
         C:\path\to\setup-vps.ps1
    (or paste the whole script into the elevated PowerShell window)

  What it does: installs IIS + URL Rewrite + Node + Git, clones the PUBLIC repo,
  builds the site, copies the build into the IIS web root, creates/updates an IIS
  site on port 80, and opens the firewall. Re-run it any time to redeploy latest.

  No secrets are used or stored. The repo is public, so nothing sensitive is cloned.
#>

#Requires -RunAsAdministrator
$ErrorActionPreference = 'Stop'

# ---- settings (edit if you like) ------------------------------------------
$Site    = 'innuka'
$Repo    = 'https://github.com/teamgriwd-del/innuka.git'
$SrcDir  = 'C:\sites\innuka-src'
$WebRoot = 'C:\inetpub\innuka'
$Port    = 80
# $HostHeader = 'innuka.co.zw'   # uncomment + set to bind a domain instead of bare IP
# ---------------------------------------------------------------------------

function Have($cmd) { [bool](Get-Command $cmd -ErrorAction SilentlyContinue) }
function RefreshPath {
  $env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' +
              [Environment]::GetEnvironmentVariable('Path','User')
}

Write-Host "`n==> 1/6  Installing IIS + management tools" -ForegroundColor Cyan
Install-WindowsFeature -Name Web-Server -IncludeManagementTools | Out-Null

Write-Host "`n==> 2/6  Installing Node LTS, Git, URL Rewrite" -ForegroundColor Cyan
if (Have winget) {
    winget install -e --id OpenJS.NodeJS.LTS       --accept-source-agreements --accept-package-agreements
    winget install -e --id Git.Git                 --accept-source-agreements --accept-package-agreements
    winget install -e --id Microsoft.IIS.URLRewrite --accept-source-agreements --accept-package-agreements
} else {
    Write-Warning "winget not found on this server. Install these three manually, then re-run:"
    Write-Warning "  Node LTS     : https://nodejs.org/en/download (Windows MSI, LTS)"
    Write-Warning "  Git          : https://git-scm.com/download/win"
    Write-Warning "  URL Rewrite  : https://www.iis.net/downloads/microsoft/url-rewrite"
    throw "Missing package manager; see warnings above."
}
RefreshPath

if (-not (Have git)) { throw "git still not on PATH - open a NEW admin PowerShell and re-run." }
if (-not (Have npm)) { throw "npm still not on PATH - open a NEW admin PowerShell and re-run." }

Write-Host "`n==> 3/6  Fetching source from GitHub" -ForegroundColor Cyan
if (Test-Path $SrcDir) { git -C $SrcDir pull --ff-only } else { git clone $Repo $SrcDir }

Write-Host "`n==> 4/6  Building the site (npm ci + npm run build)" -ForegroundColor Cyan
Push-Location $SrcDir
try {
    cmd /c "npm ci"
    $env:CI = 'false'          # treat lint warnings as warnings, not build errors
    cmd /c "npm run build"
} finally { Pop-Location }

Write-Host "`n==> 5/6  Publishing build to $WebRoot" -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path $WebRoot | Out-Null
# robocopy /MIR mirrors build/ into web root; exit codes 0-7 are success
robocopy "$SrcDir\build" $WebRoot /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed with code $LASTEXITCODE" }

Write-Host "`n==> 6/6  Configuring IIS site '$Site'" -ForegroundColor Cyan
Import-Module WebAdministration
if (Get-Website -Name $Site -ErrorAction SilentlyContinue) {
    Set-ItemProperty "IIS:\Sites\$Site" -Name physicalPath -Value $WebRoot
} else {
    if ($HostHeader) {
        New-Website -Name $Site -PhysicalPath $WebRoot -Port $Port -HostHeader $HostHeader -Force | Out-Null
    } else {
        New-Website -Name $Site -PhysicalPath $WebRoot -Port $Port -Force | Out-Null
    }
}
New-NetFirewallRule -DisplayName 'Innuka HTTP 80' -Direction Inbound -Protocol TCP `
    -LocalPort $Port -Action Allow -ErrorAction SilentlyContinue | Out-Null

iisreset /restart | Out-Null

Write-Host "`nDONE. The site is live." -ForegroundColor Green
Write-Host "  On the server:  http://localhost/"
Write-Host "  From outside :  http://<this-vps-public-ip>/"
Write-Host "To redeploy after pushing changes to GitHub, just run this script again."
