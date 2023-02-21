import React, { useState, useEffect } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { useSearchParams, useLoaderData } from "@remix-run/react";
import BackButton from "~/components/backButton";

type Book = {
  volumeInfo: {
    title: string;
    language: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    industryIdentifiers?: { identifier: string }[];
    pageCount?: number;
    categories?: string[];
  };
  searchInfo?: { textSnippet: string };
};

type DataItem = {
  heading: string;
  labeldata: string | number;
};

export const loader = async ({ request }): Promise<LoaderArgs> => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=search+terms"
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.log("error", error);
    return json({ error }, { status: 500 });
  }
};

const EbookDetailPage: React.FC = (): JSX.Element => {
  const loaderData = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("book");
  const [books, setBooks] = useState<Book[]>([]);
  const selectedBook = books.find(
    (book: Book) => book.volumeInfo.title === title
  );
  console.log("book", selectedBook, books);

  useEffect(() => {
    if (loaderData) {
      setBooks(loaderData.items as Book[]);
    }
  }, [loaderData]);

  const Data: DataItem[] = [
    { heading: "Language", labeldata: selectedBook?.volumeInfo?.language },
    { heading: "Age", labeldata: "Age 20 & Up" },
    {
      heading: "Author",
      labeldata: selectedBook?.volumeInfo?.authors
        ? selectedBook?.volumeInfo?.authors[0]
        : "authorName",
    },
    { heading: "Publisher", labeldata: selectedBook?.volumeInfo?.publisher },
    {
      heading: "Published on",
      labeldata: selectedBook?.volumeInfo?.publishedDate,
    },
    {
      heading: "ISBN",
      labeldata: selectedBook?.volumeInfo?.industryIdentifiers[0].identifier,
    },
    { heading: "Pages", labeldata: selectedBook?.volumeInfo?.pageCount },
    {
      heading: "Genre",
      labeldata: selectedBook?.volumeInfo.categories
        ? selectedBook?.volumeInfo.categories[0]
        : "BookGenre",
    },
    { heading: "Purchases", labeldata: "50M+" },
    { heading: "Size", labeldata: "5.6 MB" },
  ];

  return (
    <div className="m-5">
      <div className="flex items-center text-2xl font-medium">
        <BackButton ml="ml-0" url={"/home"} />
        <p className="w-auto">About this Ebook</p>
      </div>
      <p className="border-b-[0.5px] border-grey-light py-5 text-grey-dark">
        {selectedBook?.searchInfo?.textSnippet}
      </p>
      <div className="my-4 flex flex-wrap">
        {Data.map((item: DataItem) => {
          return (
            <div key={item} className="mt-6 w-[50%]">
              <p className="text-xl font-medium">{item.heading}</p>
              <p
                className={
                  item.heading === "Author" ||
                  item.heading === "Publisher" ||
                  item.heading === "Genre"
                    ? "text-orange-dark"
                    : null
                }
              >
                {item.labeldata}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EbookDetailPage;
