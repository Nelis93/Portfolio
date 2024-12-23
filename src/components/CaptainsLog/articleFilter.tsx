import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { LogbookEntry } from "typings";
import Link from "next/link";
import { set } from "sanity";

type ArticleFilterProps = {
  logBookEntries: LogbookEntry[];
};

export default function ArticleFilter({ logBookEntries }: ArticleFilterProps) {
  const [query, setQuery] = useState("");
  const [filteredEntries, setFilteredEntries] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  function findMatches(wordToMatch: string, entries: LogbookEntry[]) {
    const regex = new RegExp(wordToMatch, "gi");
    return entries.filter(
      (entry) => entry.title.match(regex) || entry.description.match(regex)
    );
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQuery(value);
    console.log(value);
    const matches = findMatches(value, logBookEntries);
    setFilteredEntries(matches);
    !isOpen && setIsOpen(true);
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value;
    const matches = findMatches(value, logBookEntries);
    setFilteredEntries(matches);
  }
  const handleClickOutside = (event: MouseEvent) => {
    // If the clicked target is outside the dropdown, close it
    //   console.log(dropdownRef.current);
    //   event.stopPropagation();
    //   if (
    //     dropdownRef.current &&
    //     !dropdownRef.current.contains(event.target as Node)
    //   ) {
    //     console.log("dropdown disengaged");
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      // Add event listener to detect clicks outside the dropdown
      console.log("dropdown engaged");
      document.addEventListener("click", handleClickOutside);
    } else {
      console.log("dropdown disengaged");
      // Remove event listener when dropdown is closed
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup function to remove the event listener on unmount or state change
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <form className="max-w-96 my-[50px]">
        <input
          type="text"
          className="m-0 p-[20px] h-5 text-center text-2xl shadow-sm border-solid border-[10px] w-[120%] left-[-10%] relative top-[10px] z-20 border-[#F7F7F7] rounded-s"
          placeholder="title or word"
          value={query}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          onClick={() => setIsOpen(true)}
        />
        <ul
          className="relative m-0 p-0"
          style={{ display: isOpen ? "block" : "none" }}
        >
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry, index) => (
              <Link
                key={index}
                href={`/captainsLog/bigLogs/${entry.slug.current}`}
              >
                <li
                  key={index}
                  className="bg-white hover:bg-stone-300 w-full list-none border-b-[1px] border-b-[#D8D8D8] m-0 p-[20px] transition-[background] flex flex-row flex-wrap justify-between capitalize"
                >
                  <span
                    className="name text-2xl pb-3"
                    dangerouslySetInnerHTML={{
                      __html: entry.title.replace(
                        new RegExp(`(${query})`, "gi"),
                        (match: any) =>
                          `<span class="bg-[#ffc600] w-full text-xl">${match}</span>`
                      ),
                    }}
                  />
                  <span
                    className="description text-lg line-clamp-4"
                    dangerouslySetInnerHTML={{
                      __html: entry.description.replace(
                        new RegExp(`(${query})`, "gi"),
                        (match: any) =>
                          `<span class="bg-[#ffc600]">${match}</span>`
                      ),
                    }}
                  />
                </li>
              </Link>
            ))
          ) : (
            <li className="bg-white list-none border-b-[1px] border-b-[#D8D8D8] m-0 p-[20px] transition-[background] flex justify-between capitalize">
              Filter for an article
            </li>
          )}
        </ul>
      </form>
    </div>
  );
}
