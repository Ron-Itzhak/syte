import React from "react";
import { DataTable } from "../catalogs/catalogs-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CatalogForm } from "../catalogs/catalog-form";

const Dashboard = () => {
  return (
    <div className="border-b">
      <div className="p-8 pt-6 border px-1 flex flex-col  justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Tabs defaultValue="dashboard">
          <TabsList>
            <TabsTrigger value="dashboard">Catalogs</TabsTrigger>
            <TabsTrigger value="create">Create Catalog</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <DataTable></DataTable>
          </TabsContent>
          <TabsContent value="create">
            <CatalogForm createMode={true}></CatalogForm>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
