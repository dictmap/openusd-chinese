param(
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$KeyPath = Join-Path $env:USERPROFILE ".ssh\openusd_chinese_ed25519"
if (-not (Test-Path $KeyPath)) {
    throw "SSH key not found: $KeyPath"
}

$env:GIT_SSH_COMMAND = "ssh -i `"$KeyPath`" -o IdentitiesOnly=yes"

function Invoke-Git {
    & git @args
    if ($LASTEXITCODE -ne 0) {
        throw "git $($args -join ' ') failed with exit code $LASTEXITCODE"
    }
}

if (-not (Test-Path ".git")) {
    Invoke-Git init -b main | Out-Null
}

Invoke-Git config core.sshCommand "ssh -i $KeyPath -o IdentitiesOnly=yes"
Invoke-Git config core.autocrlf false

if (-not (git config user.name)) {
    Invoke-Git config user.name "Codex"
}
if (-not (git config user.email)) {
    Invoke-Git config user.email "codex@local"
}

$remoteUrl = "git@github.com:dictmap/openusd-chinese.git"
$remotes = git remote
if ($remotes -contains "origin") {
    Invoke-Git remote set-url origin $remoteUrl
} else {
    Invoke-Git remote add origin $remoteUrl
}

Invoke-Git add -A

$status = git status --porcelain
if (-not $status) {
    Write-Output "NO_CHANGES"
    exit 0
}

if (-not $Message) {
    $stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $Message = "Sync OpenUSD bilingual artifacts $stamp"
}

Invoke-Git commit -m $Message
Invoke-Git push -u origin main

Write-Output "SYNCED"
