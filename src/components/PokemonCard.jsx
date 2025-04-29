import { typeColors } from "../utils/pokemonColor";

const PokemonCard = ({ id, name, image, type = [] }) => {
    const primaryType = type?.[0];
    const secondaryType = type?.[1];
  
    const primaryColor = typeColors[primaryType] || "#ffffff";
    const secondaryColor = typeColors[secondaryType] || primaryColor;
  
    const cardStyle = {
      background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
      backdropFilter: "blur(8px)",
    };
  

  return (
    <div
      className={`rounded-2xl shadow-md border-gray-100 w-[85vw] max-w-90 min-h-50 sm:w-[45vw] sm:max-w-[450px] sm:min-h-64 lg:w-[30vw] lg:max-w-[480px] p-1 lg:min-h-85 flex justify-between lg:justify-normal lg:flex-col lg:items-center lg:gap-3 transition-all duration-75 ease-in-out hover:scale-90`}
      aria-label={`Pokemon card for ${name}`}
      style={cardStyle}
    >
      <div className="flex justify-start lg:justify-center w-1/2 sm:min-w-42 lg:w-55">
        {image ? (
          <img
            src={image}
            alt={`picture of ${name}`}
            className="size-40 w-full h-full lg:h-40 object-contain"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full lg:h-40 bg-gray-200 animate-pulse rounded-full" />
        )}
      </div>
      <div className=" w-1/2 sm:min-w-34 lg:min-w-70 flex flex-col items-center justify-center">
        <h2 className="text-[clamp(22px,3.5vw,30px)] font-semibold capitalize text-primary">
          {name}
        </h2>

        <p className="text-[clamp(14px,2vw,18px)] text-gray-500 mb-1">#{id}</p>

        <div className="flex flex-wrap w-full justify-evenly gap-2 mt-2">
          {type.map((t, i) => (
            <span
              key={i}
              className="px-2 py-2 bg-gray-200 text-primary rounded-xl text-[clamp(15px,2.5vw,20px)] font-medium hover:bg-gray-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
