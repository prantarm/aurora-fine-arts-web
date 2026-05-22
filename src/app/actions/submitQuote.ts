"use server";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export async function submitQuoteRequest(formData: FormData) {
  try {
    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Strongly recommended for authenticated or mutation requests
      token: process.env.SANITY_API_WRITE_TOKEN, // Use a write-enabled token
    });

    const quoteData = {
      _type: "quoteRequest",
      name: formData.get("name"),
      email: formData.get("email"),
      productType: formData.get("productType"),
      dimensions: formData.get("dimensions"),
      paperGsm: formData.get("paperGsm"),
      colorSpace: formData.get("colorSpace"),
      quantity: Number(formData.get("quantity")),
      status: "New",
    };

    const response = await writeClient.create(quoteData);
    return { success: true, data: response };
  } catch (error) {
    console.error("Failed to submit quote:", error);
    return { success: false, error: "Submission failed" };
  }
}
