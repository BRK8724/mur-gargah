import { useState, useEffect } from "react";

// ===================== DATA =====================
const seatData = [
  {
    name: "Хий суудал",
    icon: "💨",
    color: "#6EE7B7",
    gradient: "from-emerald-400 to-teal-600",
    male: [1915,1923,1931,1939,1947,1955,1963,1971,1979,1987,1995,2003,2011,2019],
    female: [1917,1925,1933,1941,1949,1957,1965,1973,1981,1989,1997,2005,2013,2021],
    zug: "Зүүн зүгт гараад зүүн урдаас ирнэ",
    tarni: "Ум базар падма мамаа бизаяа суухаа",
    zasal: "Салхи шуурга, шороо, чулуунаас гэмтэхгүй хэмээн сэтгэж, салхинд цаас хийсгэн, тарнийг модонд уншиж, баруун хойд, баруун урд зүгт цацна",
    direction: "E",
  },
  {
    name: "Гал суудал",
    icon: "🔥",
    color: "#FCA5A5",
    gradient: "from-red-400 to-orange-600",
    male: [1922,1930,1938,1946,1954,1962,1970,1978,1986,1994,2002,2010,2018,2026],
    female: [1918,1926,1934,1942,1950,1958,1966,1974,1982,1990,1998,2006,2014,2022],
    zug: "Зүүн урд зүг рүү гараад урдаас ирнэ",
    tarni: "Ум базар дагий ний базар еэ мамаа бизаяа суухаа",
    zasal: "Галаас гэмтэхгүй хэмээн сэтгэж гал гаргаж (чүдэнз зурах), тарнийг усанд уншиж зүүн хойш, баруун зүгт цацна",
    direction: "SE",
  },
  {
    name: "Шороо суудал",
    icon: "🪨",
    color: "#D97706",
    gradient: "from-yellow-600 to-amber-800",
    male: [1921,1929,1937,1945,1953,1961,1969,1977,1985,1993,2001,2009,2017,2025],
    female: [1919,1927,1935,1943,1951,1959,1967,1975,1983,1991,1999,2007,2015,2023],
    zug: "Баруун зүгт гараад баруун урдаас ирнэ",
    tarni: "Ум бадма дагиний хум ма маа бизаяа суухаа",
    zasal: "Шороо, чулуунаас үл гэмтэнэ хэмээн сэтгэж шороо чулуу хөдөлгөж, тарнийг модонд уншиж, зүүн, зүүн урд зүг рүү цацна",
    direction: "W",
  },
  {
    name: "Мод суудал",
    icon: "🌲",
    color: "#4ADE80",
    gradient: "from-green-500 to-emerald-700",
    male: [1916,1924,1932,1940,1948,1956,1964,1972,1980,1988,1996,2004,2012,2020],
    female: [1916,1924,1932,1940,1948,1956,1964,1972,1980,1988,1996,2004,2012,2020],
    zug: "Хойш гараад зүүн зүгээс ирнэ",
    tarni: "Ум базар дагий ний хум мамаа бизаяа суухаа",
    zasal: "Модноос гэмтэхгүй хэмээн сэтгэж, модонд хүрч, тарнийг төмөрт уншиж, баруун урд зүгт, баруун хойд зүг рүү цацна",
    direction: "N",
  },
  {
    name: "Төмөр суудал",
    icon: "⚙️",
    color: "#94A3B8",
    gradient: "from-slate-400 to-zinc-600",
    male: [1920,1928,1936,1944,1952,1960,1968,1976,1984,1992,2000,2008,2016,2024],
    female: [1920,1928,1936,1944,1952,1960,1968,1976,1984,1992,2000,2008,2016,2024],
    zug: "Баруун урд зүгт гарч, баруунаас ирнэ",
    tarni: "Ум радна дагий ний хум мамаа бизаяа суухаа",
    zasal: "Төмрөөс үл гэмтэнэ хэмээн сэтгэж, төмөрт хүрээд, тарнийг галд уншиж, хойд, урд зүг рүү цацна",
    direction: "SW",
  },
  {
    name: "Уул суудал",
    icon: "⛰️",
    color: "#818CF8",
    gradient: "from-violet-400 to-indigo-700",
    male: [1917,1925,1933,1941,1949,1957,1965,1973,1981,1989,1997,2005,2013,2021],
    female: [1915,1923,1931,1939,1947,1955,1963,1971,1979,1987,1995,2003,2011,2019],
    zug: "Баруун хойш гараад зүүн хойноос ирнэ",
    tarni: "Ум будда дагий ний хум мамаа бизаяа суухаа",
    zasal: "Салхи шуурга, шороо, чулуунаас гэмтэхгүй хэмээн сэтгэж шороо, чулуу хөдөлгөн, салхинд цаас хийсгэж, тарнийг модонд уншиж, урд, хойд зүг рүү цацна",
    direction: "NW",
  },
  {
    name: "Ус суудал",
    icon: "💧",
    color: "#38BDF8",
    gradient: "from-sky-400 to-blue-600",
    male: [1918,1926,1934,1942,1950,1958,1966,1974,1982,1990,1998,2006,2014,2022],
    female: [1922,1930,1938,1946,1954,1962,1970,1978,1986,1994,2002,2010,2018,2026],
    zug: "Зүүн зүгт гараад хойноос ирнэ",
    tarni: "Ум гарма дагий ний хум мамаа бизаяа суухаа",
    zasal: "Усанд осолдохгүй хэмээн сэтгэж гол, судаг дээгүүр гараад, тарнийг шороонд уншиж, баруун, зүүн хойд зүг рүү цацна",
    direction: "E",
  },
  {
    name: "Огторгуй суудал",
    icon: "✨",
    color: "#E879F9",
    gradient: "from-fuchsia-400 to-purple-700",
    male: [1919,1927,1935,1943,1951,1959,1967,1975,1983,1991,1999,2007,2015,2023],
    female: [1921,1929,1937,1945,1953,1961,1969,1977,1985,1993,2001,2009,2017,2025],
    zug: "Зүүн хойш гараад баруун хойноосоо ирнэ",
    tarni: "Ум базар паг мо хум мамаа бизаяа суухаа",
    zasal: "Салхи шуурга, шороо, чулуунаас үл гэмтэнэ хэмээн сэтгэж агаарт цаас хийсгэн, шороо, чулуу хөдөлгөж, тарнийг модонд уншиж, зүүн урд, зүүн зүг рүү цацна",
    direction: "NE",
  },
];

function findSeat(year, gender) {
  for (const seat of seatData) {
    const list = gender === "male" ? seat.male : seat.female;
    if (list.includes(year)) return seat;
  }
  return null;
}

// Direction compass SVG
const directionMap = {
  N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315
};

// Mongolian animal years for display
const mongolianAnimals = {
  0: "Хулгана", 1: "Үхэр", 2: "Бар", 3: "Туулай", 4: "Луу",
  5: "Могой", 6: "Морь", 7: "Хонь", 8: "Мич", 9: "Тахиа",
  10: "Нохой", 11: "Гахай"
};
function getAnimal(year) {
  return mongolianAnimals[((year - 4) % 12 + 12) % 12];
}

// Stars background
function Stars() {
  const stars = Array.from({length: 80}, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    delay: Math.random() * 3,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute",
          left: `${s.x}%`,
          top: `${s.y}%`,
          width: `${s.size}px`,
          height: `${s.size}px`,
          borderRadius: "50%",
          background: "white",
          opacity: s.opacity,
          animation: `twinkle ${2 + s.delay}s ease-in-out infinite`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}
    </div>
  );
}

// Compass Rose
function CompassRose({ direction }) {
  const angle = directionMap[direction] ?? 0;
  return (
    <div style={{position:"relative", width:120, height:120, margin:"0 auto"}}>
      {/* Outer ring */}
      <svg viewBox="0 0 120 120" width="120" height="120">
        <circle cx="60" cy="60" r="55" fill="none" stroke="rgba(255,210,100,0.3)" strokeWidth="2"/>
        <circle cx="60" cy="60" r="48" fill="rgba(0,0,0,0.3)" stroke="rgba(255,210,100,0.5)" strokeWidth="1.5"/>
        {/* Cardinal directions */}
        {[{label:"Хойд",x:60,y:12},{label:"Урд",x:60,y:112},{label:"Зүүн",x:8,y:64},{label:"Баруун",x:112,y:64}].map(d=>(
          <text key={d.label} x={d.x} y={d.y} textAnchor="middle" fill="rgba(255,210,100,0.7)" fontSize="8" fontFamily="serif">{d.label}</text>
        ))}
        {/* Arrow */}
        <g transform={`rotate(${angle}, 60, 60)`}>
          <polygon points="60,20 65,60 60,55 55,60" fill="#FCD34D"/>
          <polygon points="60,100 65,60 60,65 55,60" fill="rgba(255,255,255,0.3)"/>
        </g>
        <circle cx="60" cy="60" r="5" fill="#FCD34D"/>
      </svg>
    </div>
  );
}

// Animated result card
function ResultCard({ seat, year, gender }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [seat, year, gender]);

  if (!seat) return null;
  const animal = getAnimal(year);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
      transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4))`,
        border: "1px solid rgba(255,210,80,0.3)",
        borderRadius: 20,
        padding: "28px 32px 24px",
        marginBottom: 20,
        backdropFilter: "blur(20px)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position:"absolute", inset:0,
          background:`linear-gradient(135deg, ${seat.color}22, transparent)`,
          borderRadius:20,
        }}/>
        <div style={{position:"relative", zIndex:1}}>
          <div style={{display:"flex", alignItems:"center", gap:16, marginBottom:16}}>
            <span style={{fontSize:52, filter:"drop-shadow(0 0 12px rgba(255,210,80,0.5))"}}>
              {seat.icon}
            </span>
            <div>
              <div style={{
                fontSize:28, fontWeight:800, color:"#FCD34D",
                fontFamily:"'Georgia', serif",
                textShadow:"0 0 20px rgba(252,211,77,0.4)",
                letterSpacing:1,
              }}>{seat.name}</div>
              <div style={{color:"rgba(255,255,255,0.6)", fontSize:14, marginTop:2}}>
                {year} он • {animal} жил • {gender === "male" ? "Эрэгтэй" : "Эмэгтэй"}
              </div>
            </div>
          </div>
          {/* Divider */}
          <div style={{height:1, background:"linear-gradient(90deg, transparent, rgba(255,210,80,0.4), transparent)", marginBottom:16}}/>
          {/* Direction badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(252,211,77,0.1)", border:"1px solid rgba(252,211,77,0.3)",
            borderRadius:30, padding:"6px 16px",
          }}>
            <span style={{fontSize:18}}>🧭</span>
            <span style={{color:"#FCD34D", fontWeight:600, fontSize:15}}>{seat.zug}</span>
          </div>
        </div>
      </div>

      {/* Two-column content */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16}}>
        {/* Compass */}
        <div style={{
          background:"rgba(0,0,0,0.5)",
          border:"1px solid rgba(255,210,80,0.2)",
          borderRadius:16, padding:"20px",
          backdropFilter:"blur(20px)",
          display:"flex", flexDirection:"column", alignItems:"center",
        }}>
          <div style={{color:"rgba(255,210,80,0.7)", fontSize:12, textTransform:"uppercase", letterSpacing:2, marginBottom:12}}>Чиглэл</div>
          <CompassRose direction={seat.direction} />
          <div style={{color:"rgba(255,255,255,0.5)", fontSize:11, marginTop:8, textAlign:"center"}}>{seat.direction}</div>
        </div>

        {/* Mantra */}
        <div style={{
          background:"rgba(0,0,0,0.5)",
          border:"1px solid rgba(255,210,80,0.2)",
          borderRadius:16, padding:"20px",
          backdropFilter:"blur(20px)",
        }}>
          <div style={{color:"rgba(255,210,80,0.7)", fontSize:12, textTransform:"uppercase", letterSpacing:2, marginBottom:12}}>📿 Тарни</div>
          <div style={{
            color:"#E9D5FF",
            fontSize:15, lineHeight:1.7,
            fontFamily:"'Georgia', serif",
            fontStyle:"italic",
          }}>{seat.tarni}</div>
        </div>
      </div>

      {/* Zasal */}
      <div style={{
        background:"rgba(0,0,0,0.5)",
        border:"1px solid rgba(255,210,80,0.2)",
        borderRadius:16, padding:"20px 24px",
        backdropFilter:"blur(20px)",
      }}>
        <div style={{color:"rgba(255,210,80,0.7)", fontSize:12, textTransform:"uppercase", letterSpacing:2, marginBottom:10}}>🙏 Засал</div>
        <div style={{color:"rgba(255,255,255,0.8)", fontSize:14, lineHeight:1.8}}>{seat.zasal}</div>
      </div>
    </div>
  );
}

// ===================== MAIN APP =====================
export default function App() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: currentYear - 1910 + 1}, (_, i) => 1910 + i).reverse();

  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    if (!gender || !year) return;
    const seat = findSeat(parseInt(year), gender);
    setResult(seat);
    setSearched(true);
  }

  const ready = gender && year;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a0a1a 0%, #0d1a2e 40%, #0a0f1a 100%)",
      fontFamily: "'Segoe UI', 'Noto Sans', sans-serif",
      color: "white",
      position: "relative",
      overflow: "hidden",
    }}>
      <Stars />

      {/* Atmospheric glows */}
      <div style={{
        position:"fixed", top:-200, left:-200, width:600, height:600,
        background:"radial-gradient(circle, rgba(252,211,77,0.06) 0%, transparent 70%)",
        pointerEvents:"none",
      }}/>
      <div style={{
        position:"fixed", bottom:-100, right:-100, width:500, height:500,
        background:"radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
        pointerEvents:"none",
      }}/>

      {/* Main content */}
      <div style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "40px 20px 80px",
        position: "relative", zIndex: 10,
      }}>

        {/* Header */}
        <div style={{textAlign:"center", marginBottom:48, animation:"fadeInUp 0.8s ease both"}}>
          {/* Moon emoji */}
          <div style={{fontSize:56, marginBottom:16, animation:"float 4s ease-in-out infinite, glow 3s ease-in-out infinite"}}>
            🌕
          </div>
          {/* Decorative line */}
          <div style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:16,
          }}>
            <div style={{width:60, height:1, background:"linear-gradient(90deg, transparent, rgba(252,211,77,0.5))"}}/>
            <span style={{color:"rgba(252,211,77,0.5)", fontSize:12, letterSpacing:3, textTransform:"uppercase"}}>Цагаан Сар</span>
            <div style={{width:60, height:1, background:"linear-gradient(90deg, rgba(252,211,77,0.5), transparent)"}}/>
          </div>
          <h1 style={{
            fontSize:36, fontWeight:900,
            fontFamily:"'Georgia', 'Times New Roman', serif",
            background:"linear-gradient(135deg, #FCD34D, #F59E0B, #FCD34D)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            backgroundSize:"200% auto",
            animation:"shimmer 4s linear infinite",
            marginBottom:8, letterSpacing:2,
          }}>
            Гал морин жилийн МӨР ГАРГАХ ЗУРХАЙ ба СУУДЛЫН ЗАСАЛ
          </h1>
          <p style={{color:"rgba(255,255,255,0.45)", fontSize:14, letterSpacing:1}}>
            Шинийн нэгний өглөө
          </p>
        </div>

        {/* Selector Card */}
        <div style={{
          background:"rgba(255,255,255,0.03)",
          border:"1px solid rgba(255,210,80,0.2)",
          borderRadius:24, padding:"32px",
          backdropFilter:"blur(30px)",
          marginBottom:28,
          animation:"fadeInUp 0.8s 0.2s ease both",
          boxShadow:"0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}>
          <div style={{fontSize:13, color:"rgba(255,210,80,0.6)", letterSpacing:2, textTransform:"uppercase", marginBottom:24}}>
            🌸 Мэдээллээ оруулна уу
          </div>

          {/* Gender select */}
          <div style={{marginBottom:20}}>
            <label style={{display:"block", color:"rgba(255,255,255,0.5)", fontSize:12, letterSpacing:1, marginBottom:8, textTransform:"uppercase"}}>
              Хүйс
            </label>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
              {[{val:"male",label:"👨 Эрэгтэй"},{val:"female",label:"👩 Эмэгтэй"}].map(opt=>(
                <button key={opt.val} onClick={()=>setGender(opt.val)} style={{
                  padding:"14px",
                  borderRadius:12,
                  border:`2px solid ${gender===opt.val ? "rgba(252,211,77,0.7)" : "rgba(255,255,255,0.1)"}`,
                  background:gender===opt.val ? "rgba(252,211,77,0.12)" : "rgba(255,255,255,0.03)",
                  color:gender===opt.val ? "#FCD34D" : "rgba(255,255,255,0.5)",
                  fontSize:15, fontWeight:600, cursor:"pointer",
                  transition:"all 0.2s",
                  transform:gender===opt.val ? "scale(1.02)" : "scale(1)",
                }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Year dropdown */}
          <div style={{marginBottom:24}}>
            <label style={{display:"block", color:"rgba(255,255,255,0.5)", fontSize:12, letterSpacing:1, marginBottom:8, textTransform:"uppercase"}}>
              Төрсөн он
            </label>
            <div style={{position:"relative"}}>
              <select
                value={year}
                onChange={e=>setYear(e.target.value)}
                style={{
                  width:"100%", padding:"14px 44px 14px 18px",
                  background:"rgba(0,0,0,0.5)",
                  border:`2px solid ${year ? "rgba(252,211,77,0.5)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius:12,
                  color:year ? "#FCD34D" : "rgba(255,255,255,0.4)",
                  fontSize:16, fontWeight:year?600:400,
                  cursor:"pointer", appearance:"none",
                  outline:"none",
                  transition:"border-color 0.2s",
                }}
              >
                <option value="">— Он сонгоно уу —</option>
                {years.map(y=>(
                  <option key={y} value={y} style={{background:"#1a1a2e", color:"white"}}>
                    {y} он — {getAnimal(y)} жил
                  </option>
                ))}
              </select>
              <div style={{
                position:"absolute", right:16, top:"50%", transform:"translateY(-50%)",
                color:"rgba(252,211,77,0.6)", pointerEvents:"none", fontSize:12,
              }}>▼</div>
            </div>
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            disabled={!ready}
            style={{
              width:"100%", padding:"16px",
              borderRadius:14, border:"none",
              background:ready
                ? "linear-gradient(135deg, #F59E0B, #FCD34D, #F59E0B)"
                : "rgba(255,255,255,0.08)",
              backgroundSize:"200% auto",
              color:ready ? "#1a0a00" : "rgba(255,255,255,0.3)",
              fontSize:16, fontWeight:800, cursor:ready?"pointer":"not-allowed",
              letterSpacing:1,
              transition:"all 0.3s",
              transform:ready?"scale(1)":"scale(0.99)",
              boxShadow:ready?"0 8px 30px rgba(252,211,77,0.3)":"none",
              animation:ready?"shimmer 3s linear infinite":"none",
            }}
          >
            🌅 Мөр гаргах чиглэл харах
          </button>
        </div>

        {/* Result */}
        {searched && (
          result
            ? <ResultCard seat={result} year={parseInt(year)} gender={gender} />
            : (
              <div style={{
                textAlign:"center", padding:"40px",
                background:"rgba(255,255,255,0.03)",
                border:"1px solid rgba(255,100,100,0.2)",
                borderRadius:20,
                color:"rgba(255,150,150,0.7)",
              }}>
                <div style={{fontSize:36, marginBottom:12}}>🔍</div>
                <div>Тухайн он олдсонгүй. Өөр он оруулна уу.</div>
              </div>
            )
        )}

        {/* Info section */}
        {!searched && (
          <div style={{
            marginTop:8,
            animation:"fadeInUp 0.8s 0.4s ease both",
          }}>
            <div style={{
              textAlign:"center",
              color:"rgba(255,255,255,0.25)",
              fontSize:12, letterSpacing:1,
              marginBottom:20,
            }}>• • •</div>

            {/* Mini seat preview */}
            <div style={{
              display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:10,
            }}>
              {seatData.map(s=>(
                <div key={s.name} style={{
                  background:"rgba(255,255,255,0.03)",
                  border:"1px solid rgba(255,255,255,0.07)",
                  borderRadius:12, padding:"12px 8px",
                  textAlign:"center",
                  transition:"all 0.2s",
                }}>
                  <div style={{fontSize:24, marginBottom:4}}>{s.icon}</div>
                  <div style={{color:"rgba(255,255,255,0.4)", fontSize:10}}>{s.name}</div>
                </div>
              ))}
            </div>

            <div style={{
              textAlign:"center", marginTop:24,
              color:"rgba(255,255,255,0.2)", fontSize:11, lineHeight:1.8,
            }}>
              Мөр гаргах зан үйл нь байгаль орчноо танин мэдэх, дасан зохицож,<br/>
              хайрлан амьдрах ухаан бөгөөд Дөрвөн зүг найман зовхисыг эрхэмлэдэг.<br/>
              Тухайн жилд хүмүүн тодорхой нэг суудалд суудаг гэж үзэх агаад мөр гаргах нь<br/>
              нүүдэл суудал, ажил үйл, аялал арилжаа нь цог хийморьтой, бүтэмжтэй байхыг бэлэгддэг.<br/><br/>
              Махбодын зурхай болон аг тарнийн ёсны уламжлалаар мөрөө гаргахдаа тухайн жилийн<br/>
              махбодоос гэмтэхгүй хэмээн сэтгэж, суусан хөллийн эсрэг махбодтой хорлол,<br/>
              таван зэтгэр зүг рүүгээ цээрийг гаргадаг ажээ.
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{textAlign:"center", marginTop:48, color:"rgba(255,255,255,0.15)", fontSize:11, letterSpacing:1}}>
          🌕 Та бүхэн сар шинэдээ сайхан шинэлээрэй 🌕
        </div>
      </div>
    </div>
  );
}
