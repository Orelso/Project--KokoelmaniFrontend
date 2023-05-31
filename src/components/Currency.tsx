import React, { useState } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

interface Props {
  defaultCurrency: Currency;
  onChange: (currency: Currency) => void;
}

export const CurrencyTab = ({
  defaultCurrency = Currency.USD,
  onChange,
}: Props) => {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const handleOpenTooltip = () => {
    setIsTooltipOpen(true);
  };

  const handleCloseTooltip = () => {
    setIsTooltipOpen(false);
  };

  const handleChange = (event: SelectChangeEvent<Currency>): void => {
    const selectedCurrency = event.target.value as Currency;
    setCurrency(selectedCurrency);
    onChange(selectedCurrency);
  };

  return (
    <Tooltip
      title="Change Currency"
      placement="top"
      open={isTooltipOpen}
      enterDelay={0}
      leaveDelay={50}
      onClose={handleCloseTooltip}
      onOpen={handleOpenTooltip}
    >
      <Select
        value={currency}
        onChange={handleChange}
        sx={{
          fontSize: "0.8em",
          width: "60px", // Adjust the width as needed
          height: "30px", // Adjust the height as needed
        }}
      >
        <MenuItem value={Currency.USD}>🇺🇸</MenuItem>
        <MenuItem value={Currency.EUR}>🇪🇺</MenuItem>
        <MenuItem value={Currency.GBP}>🇬🇧</MenuItem>
      </Select>
    </Tooltip>
  );
};
