interface GarmentShapeProps {
  color: string | null;
}

export function ShirtShape({ color }: GarmentShapeProps) {
  const fillColor = color ?? "transparent";

  return (
    <svg
      viewBox="0 0 200 240"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full transition-colors duration-300 ease-out"
    >
      {/* 1. Silueta base para el relleno de color unificado */}
      <path
        d="M 100,48 
           C 82,48 68,34 62,34 
           C 50,34 32,40 22,48 
           L 6,80 
           C 4,84 8,90 14,88 
           L 32,80 
           C 36,78 38,82 38,86 
           L 42,212 
           C 42,218 48,222 56,222 
           L 144,222 
           C 152,222 158,218 158,212 
           L 162,86 
           C 162,82 164,78 168,80 
           L 186,88 
           C 192,90 196,84 194,80 
           L 178,48 
           C 168,40 150,34 138,34 
           C 132,34 118,48 100,48 Z"
        fill={fillColor}
        stroke="none"
      />

      {/* 2. Contorno exterior de la camisa */}
      <path
        d="M 100,48 
           C 82,48 68,34 62,34 
           C 50,34 32,40 22,48 
           L 6,80 
           C 4,84 8,90 14,88 
           L 32,80 
           C 36,78 38,82 38,86 
           L 42,212 
           C 42,218 48,222 56,222 
           L 144,222 
           C 152,222 158,218 158,212 
           L 162,86 
           C 162,82 164,78 168,80 
           L 186,88 
           C 192,90 196,84 194,80 
           L 178,48 
           C 168,40 150,34 138,34 
           C 132,34 118,48 100,48"
        fill="none"
      />

      {/* 3. Detalles de confección y costuras */}
      {/* Sisa / Línea de las axilas */}
      <path d="M 38,86 C 45,95 52,100 52,108" fill="none" opacity={0.8} />
      <path d="M 162,86 C 155,95 148,100 148,108" fill="none" opacity={0.8} />

      {/* Dobladillo de las mangas (Puños) */}
      <path d="M 6,80 L 32,80" fill="none" strokeWidth={2.5} opacity={0.7} />
      <path d="M 194,80 L 168,80" fill="none" strokeWidth={2.5} opacity={0.7} />

      {/* Cuello del sastre */}
      <path d="M 62,34 L 100,60 L 138,34" fill="none" />
      <path
        d="M 62,34 C 70,48 85,54 100,54 C 115,54 130,48 138,34"
        fill="none"
      />
      <path d="M 100,54 L 100,60" fill="none" />

      {/* Tapeta central (Placket) */}
      <line x1="100" y1="60" x2="100" y2="222" strokeWidth={2.5} />

      {/* Botones estilizados (con un pequeño aro exterior para mayor detalle) */}
      {[80, 108, 136, 164, 192].map((cy) => (
        <g key={cy} opacity={0.9}>
          <circle cx="100" cy={cy} r="3" fill="currentColor" stroke="none" />
        </g>
      ))}
    </svg>
  );
}

export function PantsShape({ color }: GarmentShapeProps) {
  const fillColor = color ?? "transparent";

  return (
    <svg
      viewBox="0 0 200 260"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full transition-colors duration-300 ease-out"
    >
      {/* 1. Silueta base del pantalón */}
      <path
        d="M 45,32 
           L 155,32 
           C 162,32 166,36 164,44 
           L 142,238 
           C 141,243 136,246 130,246 
           L 110,246 
           C 104,246 101,241 101,235 
           L 100,115 
           L 99,235 
           C 99,241 96,246 90,246 
           L 70,246 
           C 64,246 59,243 58,238 
           L 36,44 
           C 34,36 38,32 45,32 Z"
        fill={fillColor}
        stroke="none"
      />

      {/* 2. Contorno exterior */}
      <path
        d="M 45,32 
           L 155,32 
           C 162,32 166,36 164,44 
           L 142,238 
           C 141,243 136,246 130,246 
           L 110,246 
           C 104,246 101,241 101,235 
           L 100,115 
           L 99,235 
           C 99,241 96,246 90,246 
           L 70,246 
           C 64,246 59,243 58,238 
           L 36,44 
           C 34,36 38,32 45,32"
        fill="none"
      />

      {/* 3. Detalles de confección */}
      {/* Cinturilla (Waistband) */}
      <path d="M 42,48 L 158,48" fill="none" />

      {/* Costura de la bragueta (Fly) */}
      <path
        d="M 100,48 L 100,92 C 100,100 94,104 88,104"
        fill="none"
        strokeWidth={2.5}
      />

      {/* Bolsillos delanteros con curva suave */}
      <path d="M 41,56 C 52,58 64,52 68,48" fill="none" strokeWidth={2.5} />
      <path d="M 159,56 C 148,58 136,52 132,48" fill="none" strokeWidth={2.5} />

      {/* Trabillas para el cinturón (Belt loops) */}
      {/* Izquierda, Centro, Derecha */}
      <line x1="56" y1="32" x2="56" y2="48" strokeWidth={2.5} />
      <line x1="100" y1="32" x2="100" y2="48" strokeWidth={2.5} />
      <line x1="144" y1="32" x2="144" y2="48" strokeWidth={2.5} />

      {/* Líneas de planchado / Pliegues (Creases) */}
      <path
        d="M 74,65 L 74,235"
        fill="none"
        strokeWidth={1.5}
        opacity={0.4}
        strokeDasharray="4 6"
      />
      <path
        d="M 126,65 L 126,235"
        fill="none"
        strokeWidth={1.5}
        opacity={0.4}
        strokeDasharray="4 6"
      />

      {/* Costura de los bajos (Cuffs) */}
      <line x1="58" y1="234" x2="98" y2="234" strokeWidth={2} opacity={0.7} />
      <line x1="102" y1="234" x2="142" y2="234" strokeWidth={2} opacity={0.7} />
    </svg>
  );
}

export function ShoeShape({ color }: GarmentShapeProps) {
  const fillColor = color ?? "transparent";

  return (
    <svg
      viewBox="0 0 240 140"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full transition-colors duration-300 ease-out"
    >
      {/* Definición de sombras internas u otras sutilezas si fuera necesario */}
      <g transform="translate(10, 5)">
        {/* 1. Silueta base del zapato principal (Upper) */}
        <path
          d="M 28,95 
             C 24,78 28,52 38,46 
             C 48,40 68,44 76,38 
             C 84,32 104,26 118,34 
             C 126,38 144,52 162,60 
             C 180,68 198,75 204,85 
             C 210,95 206,102 202,105 
             L 28,105 Z"
          fill={fillColor}
          stroke="none"
        />

        {/* 2. Contorno del zapato principal */}
        <path
          d="M 28,95 
             C 24,78 28,52 38,46 
             C 48,40 68,44 76,38 
             C 84,32 104,26 118,34 
             C 126,38 144,52 162,60 
             C 180,68 198,75 204,85 
             C 210,95 206,102 202,105"
          fill="none"
        />

        {/* 3. Suela clásica (Suela de goma / cuero de vestir) */}
        {/* La mantenemos en un color neutro o semitransparente para que destaque la estructura */}
        <path
          d="M 24,105 L 204,105 C 208,105 210,108 206,112 C 196,118 160,119 114,119 C 68,119 32,118 22,112 C 18,108 20,105 24,105 Z"
          fill="currentColor"
          fillOpacity={0.12}
        />
        <path
          d="M 24,105 L 204,105 C 208,105 210,108 206,112 C 196,118 160,119 114,119 C 68,119 32,118 22,112 C 18,108 20,105 24,105"
          fill="none"
        />
        {/* Tacón (Heel block) */}
        <path d="M 30,112 L 52,112 L 54,105" fill="none" strokeWidth={2.5} />

        {/* 4. Detalles del zapato de vestir */}
        {/* Costura trasera / Refuerzo del talón */}
        <path
          d="M 38,46 C 35,62 34,78 37,95"
          fill="none"
          strokeWidth={2}
          opacity={0.6}
        />

        {/* Apertura del tobillo (Collar) */}
        <path d="M 38,46 C 45,44 60,46 72,44 C 74,44 76,42 76,38" fill="none" />

        {/* Solapa de los cordones (Facings / Oxford wingtip detail) */}
        <path d="M 76,38 C 84,52 92,68 110,72" fill="none" strokeWidth={2.5} />
        <path
          d="M 118,34 C 122,46 128,58 144,64"
          fill="none"
          strokeWidth={2}
          opacity={0.7}
        />

        {/* Puntera (Toe cap) */}
        <path
          d="M 172,64 C 168,76 168,92 176,105"
          fill="none"
          strokeWidth={2.5}
        />

        {/* Cordones y ojales */}
        <g strokeWidth={2.5} opacity={0.9}>
          {/* Cordones cruzados */}
          <line x1="84" y1="46" x2="100" y2="42" />
          <line x1="88" y1="56" x2="104" y2="52" />
          <line x1="92" y1="66" x2="108" y2="62" />

          {/* Ojales */}
          <circle cx="84" cy="46" r="1.5" fill="currentColor" />
          <circle cx="100" cy="42" r="1.5" fill="currentColor" />
          <circle cx="88" cy="56" r="1.5" fill="currentColor" />
          <circle cx="104" cy="52" r="1.5" fill="currentColor" />
          <circle cx="92" cy="66" r="1.5" fill="currentColor" />
          <circle cx="108" cy="62" r="1.5" fill="currentColor" />
        </g>
      </g>
    </svg>
  );
}
