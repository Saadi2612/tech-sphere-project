import { Card, CardContent, CardMedia, Typography ,CardActions,Button} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import LaptopDetailPage from "./LaptopDetailPage";
const CardSection = (props) => {
  return (
    <div className="card-section">
      {props.data
        .slice((props.page - 1) * 8, (props.page - 1) * 8 + 8)
        .map((item, index) => (
          <Card
            className="card"
            key={item._id}
            sx={{
              ":hover": { boxShadow: 5 },
              textAlign: "left",
              lineHeight: "5px",
            }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={item.images[1]}
            />
            <CardContent>
              {/* <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  noWrap
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    fontSize: 15,
                    fontWeight: 400,
                    fontFamily: "Poppins",
                  }}
                >
                  {item.title}
                </Typography> */}
              <Typography
                variant="body1"
                color="text.primary"
                noWrap
                sx={{
                  fontSize: 15,
                  fontWeight: 400,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="h6"
                color="text.primary"
                sx={{
                  fontSize: 16,
                  fontFamily: "Poppins",
                  mt: 1,
                }}
              >
                Rs.{item.price}
              </Typography>
            </CardContent>
            <CardActions>
                      <Link to={"/LaptopDetailPage/" + item._id} >
                    <Button size="small" variant="outlined">
                      Details
                    </Button>
                     </Link>
                  
                  </CardActions> 
           
             
          </Card>
        ))}
    </div>
  );
};

export default CardSection;
