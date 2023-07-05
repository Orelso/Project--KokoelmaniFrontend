/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { FormControlLabel, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
// * mui/styules uses react 17
// import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
// import {useNavigate} from 'react-router-dom';
import Checkbox from "@mui/material/Checkbox";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocalStorage } from "react-use";
import { BACKEND_URL } from "../../../constants";
import { AnyCard } from "../../../types";
import { MODIFIED_VALUES } from "../../../components/SearchBar/searchBarUtils";

const DB_KEY = "mockCreateCollectionItem:items";

export default function CreateCollection({
  selectedCard,
}: {
  selectedCard: AnyCard | undefined;
}) {
  // const classes = useStyles();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const [newItem, setNewItem] = useState(
    selectedCard?.name || selectedCard?.title
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const [cost, setCost] = useState("");
  const [language, setLanguage] = useState(selectedCard?.lang);
  const languageValue = MODIFIED_VALUES[language] || language;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const [set, setSet] = useState(
    selectedCard?.set_name ||
      selectedCard?.series ||
      selectedCard?.platforms?.[0]?.platform?.name
  );
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("MTG");
  const [condition, setCondition] = useState("");
  // const [foil, setFoil] = useState(Boolean)
  // const [autographed, setAutographed] = useState(Boolean)
  const [newItemError, setNewItemError] = useState(false); // 103
  const [costError, setCostError] = useState(false);
  const [languageError, setLanguageError] = useState(false); // 103
  const [setError, setSetError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [conditionError, setConditionError] = useState(false);
  const [image, setImage] = useState(
    selectedCard?.image_uris?.border_crop ||
      selectedCard?.image_url ||
      selectedCard?.card_images?.[0]?.image_url ||
      selectedCard?.imageName ||
      selectedCard?.background_image ||
      selectedCard?.images?.large
  );

  const [dbItems, setDbItems] = useLocalStorage(DB_KEY, [] as any[]);

  const handleTheSubmit = (e: any) => {
    console.log(
      "🚀 ~ file: CreateCollection.tsx:152 ~ handleTheSubmit ~ e:",
      e
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();

    setNewItemError(false);
    setCostError(false);
    setLanguageError(false);
    setSetError(false);
    setQuantityError(false);
    setConditionError(false);

    if (newItem === "") {
      setNewItemError(true);
    }

    if (cost === "") {
      setCostError(true);
    }

    if (language === "") {
      setLanguageError(true);
    }

    if (set === "") {
      setSetError(true);
    }

    if (quantity === "") {
      setQuantityError(true);
    }

    if (condition === "") {
      setConditionError(true);
    }

    const cardItem = {
      category,
      newItem,
      set,
      quantity,
      cost,
      language,
      condition,
      image,
    };
    console.log(
      "🚀 ~ file: CreateCollection.tsx:122 ~ handleTheSubmit ~ cardItem:",
      cardItem
    );

    createCollectionItem(cardItem)
      .then((res) => {
        console.log("🚀 ~ file: CreateCollection.tsx:129 ~ .then ~ res:", res);
        // TODO consider ux of adding many items at once
        void router.push("/collections");
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: Createcollection.tsx:114 ~ handleTheSubmit ~ err",
          err
        );
        return {};
      });
    // }
  };

  return (
    <Container sx={{ backgroundColor: "pink" }}>
      <Typography
        sx={{ mt: 12 }}
        // className={classes.title}
        variant="h2"
        component="h2"
        gutterBottom
        align="center"
      >
        Add to my Collection
      </Typography>

      {image && (
        <img
          src={image}
          alt="Card Preview"
          style={{
            width: "100%",
            maxHeight: "50px",
            objectFit: "contain",
            margin: "1em 0",
          }}
        />
      )}

      <form noValidate autoComplete="off" onSubmit={handleTheSubmit}>
        <FormControl sx={{ marginTop: 1, marginBottom: 2, display: "block" }}>
          <RadioGroup
            row
            value={category}
            onChange={(e) => setCategory(String(e.target.value))}
          >
            <FormControlLabel value="MTG" control={<Radio />} label="MTG" />
            <FormControlLabel
              value="Pokemon"
              control={<Radio />}
              label="Pokemon"
            />
            <FormControlLabel
              value="Digimon"
              control={<Radio />}
              label="Digimon"
            />
            <FormControlLabel
              value="Yu-Gi-Oh"
              control={<Radio />}
              label="Yu-gi-oh"
            />
            <FormControlLabel
              value="FunkoPop"
              control={<Radio />}
              label="FunkoPop"
            />
            <FormControlLabel
              value="Video Games"
              control={<Radio />}
              label="Video Games"
            />
            <FormControlLabel
              value="Flesh & Blood"
              control={<Radio />}
              label="Flesh & Blood"
            />
            <FormControlLabel
              value="Comic Book"
              control={<Radio />}
              label="Comic Book"
            />
            <FormControlLabel value="NFT" control={<Radio />} label="NFT" />
          </RadioGroup>
        </FormControl>
        <TextField
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          sx={{ marginTop: 3, marginBottom: 2, display: "block" }}
          label="Card Name"
          variant="outlined"
          color="secondary"
          fullWidth // makes form the length of page
          required // adds astrik
          error={newItemError}
        />
        <TextField
          value={set}
          onChange={(e) => setSet(e.target.value)}
          sx={{ marginTop: 3, marginBottom: 2, display: "block" }}
          label="Set"
          variant="outlined"
          color="secondary"
          fullWidth // makes form the length of page
          required // adds astrik
          error={setError}
        />
        <TextField
          onChange={(e) => setCost(Number(e.target.value))}
          sx={{ marginTop: 3, marginBottom: 2, display: "block" }}
          label="Cost"
          variant="outlined"
          color="secondary"
          fullWidth
          required // adds asterisk
          error={costError}
          type="number" // set input type to "number"
        />

        <TextField
          value={languageValue}
          onChange={(e) => setLanguage(e.target.value)}
          sx={{ marginTop: 3, marginBottom: 2, display: "block" }}
          label="Language"
          variant="outlined"
          color="secondary"
          fullWidth
          required // adds astrik
          error={languageError}
        ></TextField>
        <TextField
          onChange={(e) => setCondition(e.target.value)}
          sx={{ marginTop: 3, marginBottom: 2, display: "block" }}
          // label="Condition"
          variant="outlined"
          color="secondary"
          fullWidth
          required // adds asterisk
          error={conditionError}
          select // adds select option
          SelectProps={{
            native: true,
          }}
        >
          <option value="" disabled>
            Select an option
          </option>
          <option
            value="Gem Mint 10"
            title="The highest grade assigned. The collectible must have no evidence of any manufacturing or handling defects."
          >
            Gem Mint 10
          </option>
          <option
            value="Mint 9.9"
            title="The collectible is nearly indistinguishable from a 10.0 but will have a very minor manufacturing defect. It will not have any evidence of handling defects."
          >
            Mint 9.9
          </option>
          <option
            value="NM/M 9.8"
            title="A nearly perfect collectible with negligible handling or manufacturing defects."
          >
            NM/M 9.8
          </option>
          <option
            value="NM+ 9.6"
            title="A very well-preserved collectible with several minor manufacturing or handling defects."
          >
            NM+ 9.6
          </option>
          <option
            value="NM 9.4"
            title="A very well-preserved collectible with minor wear and small manufacturing or handling defects."
          >
            NM 9.4
          </option>
          <option
            value="NM- 9.2"
            title="A very well-preserved collectible with some wear and small manufacturing or handling defects."
          >
            NM- 9.2
          </option>
          <option
            value="VF/NM 9.0"
            title="A very well-preserved collectible with good eye appeal. There will be a number of minor handling and/or manufacturing defects."
          >
            VF/NM 9.0
          </option>
          <option
            value="VF+ 8.5"
            title="An attractive collectible with a moderate defect or a number of small defects."
          >
            VF+ 8.5
          </option>
          <option
            value="VF 8.0"
            title="An attractive collectible with a moderate defect or an accumulation of small defects."
          >
            VF 8.0
          </option>
          <option
            value="VF- 7.5"
            title="An above-average collectible with a moderate defect or an accumulation of small defects."
          >
            VF- 7.5
          </option>
          <option
            value="FN/VF 7.0"
            title="An above-average collectible with a major defect or an accumulation of small defects."
          >
            FN/VF 7.0
          </option>
          <option
            value="FN+ 6.5"
            title="An above-average collectible with a major defect and some smaller defects, or a significant accumulation of small defects."
          >
            FN+ 6.5
          </option>
          <option
            value="FN 6.0"
            title="A slightly above-average collectible with a major defect and some smaller defects, or a significant accumulation of small defects."
          >
            FN 6.0
          </option>
          <option
            value="FN- 5.5"
            title="A slightly above-average collectible with several moderate defects."
          >
            FN- 5.5
          </option>
          <option
            value="VG/FN 5.0"
            title="An average collectible with several moderate defects."
          >
            VG/FN 5.0
          </option>
          <option
            value="VG+ 4.5"
            title="A slightly below-average collectible with multiple moderate defects."
          >
            VG+ 4.5
          </option>
          <option
            value="VG 4.0"
            title="A below-average collectible with multiple moderate defects."
          >
            VG 4.0
          </option>
          <option
            value="VG- 3.5"
            title="A below-average collectible with several major defects or an accumulation of multiple moderate defects."
          >
            VG- 3.5
          </option>
          <option
            value="G/VG 3.0"
            title="A collectible that shows significant evidence of handling with several moderate-to-major defects."
          >
            G/VG 3.0
          </option>
          <option
            value="G 2.5"
            title="A collectible that shows extensive evidence of handling with multiple moderate-to-major defects."
          >
            G 2.5
          </option>
          <option
            value="G 2.0"
            title="A collectible that shows extensive evidence of handling with numerous moderate-to-major defects."
          >
            G 2.0
          </option>
          <option
            value="G- 1.8"
            title="A collectible that shows extensive evidence of handling with numerous major defects."
          >
            G- 1.8
          </option>
          <option
            value="Fa/G 1.5"
            title="A collectible that shows extensive evidence of handling with a heavy accumulation of major defects."
          >
            Fa/G 1.5
          </option>
          <option
            value="Fa 1.0"
            title="A very poorly handled collectible with a heavy accumulation of major defects."
          >
            Fa 1.0
          </option>
          <option
            value="Poor 0.5"
            title="A heavily defaced collectible with a number of major defects. Some pieces will also be missing."
          >
            Poor 0.5
          </option>
        </TextField>

        <TextField
          onChange={(e) => setQuantity(Number(e.target.value))}
          sx={{ marginTop: 3, marginBottom: 2, display: "block" }}
          label="Quantity"
          variant="outlined"
          color="secondary"
          fullWidth
          required // adds asterisk
          error={quantityError}
          type="number" // set input type to "number"
        ></TextField>

        <FormControl sx={{ marginTop: -1, marginBottom: 5, display: "block" }}>
          <FormControlLabel control={<Checkbox />} label="Foil" />
          <FormControlLabel control={<Checkbox />} label="Autographed" />
          <FormControlLabel control={<Checkbox />} label="Graded" />
        </FormControl>

        <Button
          sx={{
            fontSize: 16,
            "&:hover": { backgroundColor: "green" },
            marginTop: -7,
          }}
          type="submit"
          variant="contained"
          endIcon={<SendOutlinedIcon />}
        >
          Submit
        </Button>
        <Button
          sx={{
            fontSize: 16,
            "&:hover": { backgroundColor: "green" },
            marginTop: -7,
            marginLeft: 1,
          }}
          type="reset"
          variant="contained"
          endIcon={<ClearIcon />}
        >
          Clear
        </Button>
      </form>
    </Container>
  );
}
function createCollectionItem(cardItem: any): Promise<Response> {
  return fetch(`${BACKEND_URL}/collections`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(cardItem),
  });
}
/** mock = just use localStorage for now */
function mockCreateCollectionItem(cardItem: any): Promise<Response> {
  const item = JSON.stringify(cardItem);
  return new Promise((resolve, reject) => {
    const currentItems = window.localStorage.getItem(DB_KEY);
    if (!currentItems) {
      // empty DB, just put the one in
      window.localStorage.setItem(DB_KEY, JSON.stringify([item]));
      return resolve(new Response());
    } else {
      try {
        const parsedItems = JSON.parse(currentItems);
        window.localStorage.setItem(
          DB_KEY,
          JSON.stringify([...parsedItems, item])
        );
      } catch (error) {
        console.error(error);
      }
    }
  });
}
