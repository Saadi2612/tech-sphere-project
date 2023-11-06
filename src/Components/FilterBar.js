import { Divider, FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const FilterBar = (props) => {
  //const [page, setPage] = useState(1);

  const showingResults = () => {
    let to = (props.currentPage - 1) * 8 + 8;
    let total = props.data?.length;

    if (to > total) {
      return (props.currentPage - 1) * 8 + 1 + "-" + props.data?.length;
    } else {
      return (
        (props.currentPage - 1) * 8 +
        1 +
        "-" +
        ((props.currentPage - 1) * 8 + 8)
      );
    }
  };

  return (
    <div className="filter-bar">
      <div className="bar-section-1">
        <i className="fa-solid fa-filter fa-lg"></i>
        <p>Filter</p>
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            height: "30px",
            width: 2,
            marginLeft: "2%",
            marginRight: "2%",
            "@media screen and (max-width: 500px)": {
              marginLeft: "3%",
              marginRight: "0px",
            },
          }}
        />

        <p>
          Showing {showingResults()} of {props.data?.length} Results
        </p>
      </div>

      <div className="bar-section-2">
        <p>Sort by</p>

        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={props.sortBy}
            onChange={props.sortByChange}
            sx={{
              m: 0,
              //minWidth: 120,
              maxWidth: 100,
              backgroundColor: "white",
              borderRadius: "10px",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  border: 3,
                  borderColor: "#9780C3",
                  transition: "all 0.1s ease-in-out",
                },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: 3,
                  borderColor: "#9780C3",
                },

              "@media screen and (max-width: 500px)": {
                maxWidth: 100,
                m: -0.5,
              },
            }}
          >
            <MenuItem value="Default">Default</MenuItem>
            <MenuItem value="Price">Price</MenuItem>
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default FilterBar;
