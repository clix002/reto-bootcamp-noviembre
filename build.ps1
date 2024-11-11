# Compilar TypeScript
tsc

# Verificar si la compilación fue exitosa
if ($?) {
    # Verificar si el archivo scraper.js existe
    if (Test-Path "./dist/scraper.js") {
        # Ejecutar el archivo JavaScript generado
        node ./dist/scraper.js
    } else {
        Write-Host "El archivo dist/scraper.js no fue generado."
    }
} else {
    Write-Host "Error en la compilación de TypeScript."
}
