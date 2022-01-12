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
    router.push({
      pathname: "/companies/[id]",
      query: { id: item.id },
    });
  };

  return (
    <div className=" min-w-300 relative z-50 self-center">
      <ReactSearchAutocomplete
        items={items}
        maxResults={5}
        onSelect={handleOnSelect}
        autoFocus
        placeholder={"Search for companies"}
      />
    </div>
  );
};

export default AutoComplete;
