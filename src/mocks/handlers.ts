import { http, HttpResponse } from "msw";
import {mockProducts, mockUser } from "./data";

export const handlers = [
  http.get("*/auth/me", () => {
    return HttpResponse.json(mockUser);
  }),

  http.get("*/products", () => {
    return HttpResponse.json(mockProducts);
  }),
];
