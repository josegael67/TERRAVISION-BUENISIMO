export type Language = "es" | "en"

export const translations = {
  es: {
    // Header
    appName: "TERRAVISION",
    appSubtitle: "Mobility Insights",
    poweredBy: "Powered by NASA Data",

    // Location Selector
    planYourTrip: "Planifica tu viaje",
    knowHistoricalConditions: "Conoce las condiciones climáticas históricas para tu ruta",
    origin: "Origen",
    destination: "Destino",
    travelDate: "Fecha del viaje",
    desiredArrivalTime: "Hora de llegada deseada",
    analyzeConditions: "Analizaremos las condiciones para esta hora",
    continue: "Continuar",
    useCurrentLocation: "Usar ubicación actual",
    gettingLocation: "Obteniendo ubicación...",
    yearsOfData: "Años de datos",
    transports: "Transportes",
    officialData: "Datos oficiales",

    // Location errors
    browserNoGeolocation: "Tu navegador no soporta geolocalización",
    couldNotGetLocation: "No se pudo obtener tu ubicación",
    permissionDenied: "Permiso de ubicación denegado",
    locationUnavailable: "Ubicación no disponible",
    timeout: "Tiempo de espera agotado",

    // Transport Selector
    selectTransport: "Selecciona tu transporte",
    back: "Volver",
    arrival: "Llegada",
    analyzeNASAData: "Analizaremos datos históricos de NASA para este medio de transporte",

    // Transport names
    car: "Auto",
    motorcycle: "Moto",
    truck: "Camión",
    train: "Tren",
    bicycle: "Bicicleta",
    walking: "A pie",
    wheelchair: "Silla de ruedas",

    // Climate Results
    changeTransport: "Cambiar transporte",
    from: "De:",
    to: "A:",
    discomfortLevel: "Nivel de incomodidad",
    probability: "de probabilidad",
    mainCondition: "Condición principal",
    historicallyProbability: "Históricamente hay un",
    ofProbability: "% de probabilidad de lluvia con calles encharcadas y baja visibilidad.",
    expectedConditions: "Condiciones esperadas",
    peakRiskHours: "Horario de mayor riesgo",
    alternativeRecommendations: "Recomendaciones alternativas",
    historicalNote: "Nota histórica:",
    listen: "Escuchar",
    share: "Compartir",
    download: "Descargar",
    dataProvidedBy: "Datos proporcionados por NASA POWER, GPM y MERRA-2",
    basedOnHistorical: "Basado en análisis histórico de 20+ años",

    // Severity levels
    high: "Alto",
    medium: "Medio",
    low: "Bajo",

    // Conditions
    rain: "Lluvia",
    floodedStreets: "Calles encharcadas",
    lowVisibility: "Baja visibilidad",
    slipperyPavement: "Pavimento resbaloso",
    slowTraffic: "Tráfico lento",
    reducedVisibility: "Visibilidad reducida",
    moderateRain: "Lluvia moderada",

    // Recommendations
    avoidPeakHours: "Evita circular entre 4 p.m. y 7 p.m., cuando la probabilidad aumenta.",
    planExtraTime: "Planifica tiempo extra para tu viaje.",
    typicalConditions: "Condiciones típicas para esta época del año.",
    juneHighRainProbability: "En los últimos 20 años, junio presenta alta probabilidad de lluvias vespertinas.",

    // Footer
    historicalNASAData: "Datos históricos NASA",
    help: "Ayuda",
    accessibility: "Accesibilidad",
  },
  en: {
    // Header
    appName: "TERRAVISION",
    appSubtitle: "Mobility Insights",
    poweredBy: "Powered by NASA Data",

    // Location Selector
    planYourTrip: "Plan your trip",
    knowHistoricalConditions: "Learn about historical climate conditions for your route",
    origin: "Origin",
    destination: "Destination",
    travelDate: "Travel date",
    desiredArrivalTime: "Desired arrival time",
    analyzeConditions: "We will analyze conditions for this time",
    continue: "Continue",
    useCurrentLocation: "Use current location",
    gettingLocation: "Getting location...",
    yearsOfData: "Years of data",
    transports: "Transports",
    officialData: "Official data",

    // Location errors
    browserNoGeolocation: "Your browser doesn't support geolocation",
    couldNotGetLocation: "Could not get your location",
    permissionDenied: "Location permission denied",
    locationUnavailable: "Location unavailable",
    timeout: "Request timeout",

    // Transport Selector
    selectTransport: "Select your transport",
    back: "Back",
    arrival: "Arrival",
    analyzeNASAData: "We will analyze NASA historical data for this mode of transport",

    // Transport names
    car: "Car",
    motorcycle: "Motorcycle",
    truck: "Truck",
    train: "Train",
    bicycle: "Bicycle",
    walking: "Walking",
    wheelchair: "Wheelchair",

    // Climate Results
    changeTransport: "Change transport",
    from: "From:",
    to: "To:",
    discomfortLevel: "Discomfort level",
    probability: "probability",
    mainCondition: "Main condition",
    historicallyProbability: "Historically there is a",
    ofProbability: "% probability of rain with flooded streets and low visibility.",
    expectedConditions: "Expected conditions",
    peakRiskHours: "Peak risk hours",
    alternativeRecommendations: "Alternative recommendations",
    historicalNote: "Historical note:",
    listen: "Listen",
    share: "Share",
    download: "Download",
    dataProvidedBy: "Data provided by NASA POWER, GPM and MERRA-2",
    basedOnHistorical: "Based on 20+ years of historical analysis",

    // Severity levels
    high: "High",
    medium: "Medium",
    low: "Low",

    // Conditions
    rain: "Rain",
    floodedStreets: "Flooded streets",
    lowVisibility: "Low visibility",
    slipperyPavement: "Slippery pavement",
    slowTraffic: "Slow traffic",
    reducedVisibility: "Reduced visibility",
    moderateRain: "Moderate rain",

    // Recommendations
    avoidPeakHours: "Avoid traveling between 4 PM and 7 PM, when probability increases.",
    planExtraTime: "Plan extra time for your trip.",
    typicalConditions: "Typical conditions for this time of year.",
    juneHighRainProbability: "Over the last 20 years, June shows high probability of evening rains.",

    // Footer
    historicalNASAData: "NASA historical data",
    help: "Help",
    accessibility: "Accessibility",
  },
}
