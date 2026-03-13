'use client'
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import AddModal from "./Component/AddModal";

const todos = () => {

  useEffect(() => {
    redirect("/home");
  }, [])

	return(
		<div></div>
	)
};

export default todos;