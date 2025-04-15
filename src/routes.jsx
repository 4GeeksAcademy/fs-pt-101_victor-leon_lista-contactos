import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ContactList from "./pages/ContactList";
import { AddContact } from "./pages/AddContact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ContactList />} errorElement={<h1 className="text-center mt-5">No encontrado!</h1>} />
      <Route path="/add" element={<AddContact />} />
    </>
  )
);
