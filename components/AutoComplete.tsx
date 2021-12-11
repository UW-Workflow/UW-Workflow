import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Company } from "../models/interfaces/types/Company";
import { useRouter } from "next/router";
interface AutoCompleteProps {
  items: Company[];
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({ items }) => {
  const router = useRouter();
  const handleOnSelect = (item: Company) => {
    // TODO: Take them to the company page
    console.log(item);
    router.push(`companies/${item.id}`);
  };

  return (
    <div style={{ width: 400 }}>
      <ReactSearchAutocomplete
        items={items}
        onSelect={handleOnSelect}
        autoFocus
        placeholder={"Search for companies"}
      />
    </div>
  );
};

export default AutoComplete;
