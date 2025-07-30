import React from "react";
import { useNavigate } from "react-router-dom";
import { Styles } from "../../data/stylesData";
import StyleCard from "./StyleCard";
import { Card, Typography } from "@mui/material";

const StylesGrid: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (slug: string) => {
  navigate(`/products`);
};

  const displayedStyles = Styles;

  return (
    <>
      <Card className="col-span-12 w-full p-4">
        <Typography variant="h3" align="center" color="#4f5151">
          DUYỆT THEO PHONG CÁCH ĂN MẶC
        </Typography>
      </Card>

      <div className="flex flex-col gap-4 p-4 md:p-12 items-center">
        {/* Hàng 1 */}
        <div className="flex flex-wrap justify-center gap-4 w-full">
          <StyleCard
            style={displayedStyles[0]}
            className="w-full md:w-1/4"
            onClick={() => handleClick(displayedStyles[0].slug)}
          />
          <StyleCard
            style={displayedStyles[1]}
            className="w-full md:w-1/3"
            onClick={() => handleClick(displayedStyles[1].slug)}
          />
          <StyleCard
            style={displayedStyles[3]}
            className="w-full md:w-1/4"
            onClick={() => handleClick(displayedStyles[3].slug)}
          />
        </div>

        {/* Hàng 2 */}
        <div className="flex flex-wrap justify-center gap-4 w-full">
          <StyleCard
            style={displayedStyles[5]}
            className="w-full md:w-1/3"
            onClick={() => handleClick(displayedStyles[5].slug)}
          />
          <StyleCard
            style={displayedStyles[2]}
            className="w-full md:w-1/4"
            onClick={() => handleClick(displayedStyles[2].slug)}
          />
          <StyleCard
            style={displayedStyles[4]}
            className="w-full md:w-1/3"
            onClick={() => handleClick(displayedStyles[4].slug)}
          />
        </div>

        {/* Hàng 3 */}
        <div className="flex flex-wrap justify-center gap-4 w-full">
          <StyleCard
            style={displayedStyles[6]}
            className="w-full md:w-1/4"
            onClick={() => handleClick(displayedStyles[6].slug)}
          />
          <StyleCard
            style={displayedStyles[7]}
            className="w-full md:w-1/3"
            onClick={() => handleClick(displayedStyles[7].slug)}
          />
        </div>
      </div>
    </>
  );
};

export default StylesGrid;
