"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Catalog } from "../catalogs/types";
import { Result } from "postcss";

interface CatalogsContextType {
  catalogs: Catalog[];
  createCatalog: (newCatalog: Catalog) => Promise<number>;
  deleteCatalog: (idOrIds: string | string[]) => Promise<number>;
  upadateCatalog: (updatedCatalog: Catalog) => Promise<number>;
  isLoading: boolean;
  isSubmitting: boolean;
  submitError: string | null;
}

const CatalogsContext = createContext<CatalogsContextType | undefined>(
  undefined
);

export const CatalogsProvider = ({ children }: { children: ReactNode }) => {
  const apiUrl =
    typeof window === "undefined"
      ? process.env.INTERNAL_API
      : process.env.NEXT_PUBLIC_API;

  const [isLoading, setIsLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [catalogs, setCatalogs] = React.useState<Catalog[]>([]);

  const fetchPosts = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/catalogs`);
      const result = await response.json();
      if (response.ok) {
        const catalogsData: Catalog[] = result.data;
        setCatalogs(catalogsData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createCatalog = async (newCatalog: Catalog) => {
    try {
      setIsSubmitting(true);
      const url = `${apiUrl}/catalogs`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCatalog),
      });

      if (response.ok) {
        const result = await response.json();
        const id = result.data.insertedId;
        setCatalogs((oldCatalogs) => {
          if (newCatalog.isPrimary) {
            return [
              ...oldCatalogs.map((catalog) =>
                catalog.vertical === newCatalog.vertical && catalog.isPrimary
                  ? { ...catalog, isPrimary: false }
                  : catalog
              ),
              { ...newCatalog, _id: id },
            ];
          } else {
            return [...oldCatalogs, { ...newCatalog, _id: id }];
          }
        });
      }
      return response.status;
    } catch (error: any) {
      console.error("add failed:", error);
      setSubmitError(error.message);
      return 500;
    } finally {
      setIsSubmitting(false);
    }
  };

  const upadateCatalog = async (updatedCatalog: Catalog) => {
    try {
      setIsSubmitting(true);
      const url = `${apiUrl}/catalogs`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCatalog),
      });
      if (response.ok) {
        const result = await response.json();

        const updatedFromServer = result.data;

        setCatalogs((prevCatalogs) =>
          prevCatalogs.map((catalog) => {
            if (catalog._id === updatedCatalog._id) {
              return { ...catalog, ...updatedFromServer };
            }
            if (
              updatedCatalog.isPrimary &&
              catalog.vertical === updatedCatalog.vertical &&
              catalog.isPrimary
            ) {
              return { ...catalog, isPrimary: false };
            }
            return catalog;
          })
        );
      }
      return response.status;
    } catch (error: any) {
      console.error("add failed:", error);
      setSubmitError(error.message);
      return error.status as number;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCatalog = async (idOrIds: string | string[]) => {
    if (typeof idOrIds === "string") {
      const url = `${apiUrl}/catalogs/delete/${idOrIds}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
      setCatalogs((prevCatalogs) => {
        return prevCatalogs.filter((catalog) => catalog._id !== idOrIds);
      });
      return response.status;
    } else {
      const url = `${apiUrl}/catalogs/bulkDelete?ids=${idOrIds}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
      setCatalogs((prevCatalogs) => {
        return prevCatalogs.filter((catalog) => !idOrIds.includes(catalog._id));
      });
      return response.status;
    }
  };

  return (
    <CatalogsContext.Provider
      value={{
        catalogs,
        createCatalog,
        deleteCatalog,
        upadateCatalog,
        isLoading,
        isSubmitting,
        submitError,
      }}
    >
      {children}
    </CatalogsContext.Provider>
  );
};

export const useCatalogs = () => {
  const context = useContext(CatalogsContext);
  if (!context) {
    throw new Error("useCatalogs must be used within an CatalogsProvider");
  }
  return context;
};
