import React from "react";

export interface ModuleCollectionProps {
  cards: React.ReactNode[];
}

const ModuleCollection: React.FC<ModuleCollectionProps> = ({ cards }) => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-8 w-full">
      {cards.map((card, idx) => (
        <div key={idx} className="lg:w-5/12 h-full w-full max-w-md">
          {card}
        </div>
      ))}
    </div>
  );
};

export default ModuleCollection;
