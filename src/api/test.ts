import Request from "@/utils/axios";

export function getTestData() {
    return Request.get<string>("/api/flight/getLastDataTime");
}
