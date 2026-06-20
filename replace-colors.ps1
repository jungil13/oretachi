$files = Get-ChildItem -Path 'e:\downloads\my-app\my-app\components','e:\downloads\my-app\my-app\app' -Include '*.tsx','*.ts','*.css' -Recurse

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $content = $content -replace '#e6c18f', '#FACC15'
    $content = $content -replace '#d4ad7a', '#EAB308'
    $content = $content -replace 'rgba\(230,193,143', 'rgba(250,204,21'
    $content = $content -replace '#D2CE12', '#FACC15'
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Updated: $($file.Name)"
}

Write-Host "Done."
