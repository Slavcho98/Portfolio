import supabase from "./supabase";

type TableName =
  | "currentEvents"
  | "popularSurveys"
  | "companyCulture"
  | "companyCulture2"
  | "newestBlogs"
  | "HRcoffee"
  | "HRweekend"
  | "HRwebinar"
  | "HRconference"
  | "speakers"
  | "eventsSchedule"
  | "carousel"
  | "jobs"
  | "comments"
  | "commentReplies"
  | "fcm_tokens"
  | "friends"
  | "board"
  | "speakersTestimonials"
  | "recommendations"
  | "blogs"

async function fetchDataFromTable(tableName: TableName) {
  const { data, error } = await supabase.from(tableName).select("*");

  if (error) {
    console.error(error);
    throw new Error(`${tableName} could not be loaded`);
  }

  return data;
}

export async function getCurrentEvents() {
  return fetchDataFromTable("currentEvents");
}
export async function getPopularSurveys() {
  return fetchDataFromTable("popularSurveys");
}
export async function getCompanyCulture() {
  return fetchDataFromTable("companyCulture");
}
export async function getCompanyCulture2() {
  return fetchDataFromTable("companyCulture2");
}
export async function getNewestBlogs() {
  return fetchDataFromTable("newestBlogs");
}
export async function getHRcoffee() {
  return fetchDataFromTable("HRcoffee");
}
export async function getHRweekend() {
  return fetchDataFromTable("HRweekend");
}
export async function getHRwebinar() {
  return fetchDataFromTable("HRwebinar");
}
export async function getHRconference() {
  return fetchDataFromTable("HRconference");
}
export async function getSpeakers() {
  return fetchDataFromTable("speakers");
}
export async function getCalendarEvents() {
  return fetchDataFromTable("eventsSchedule");
}
export async function getCarousel() {
  return fetchDataFromTable("carousel");
}
export async function getJobs() {
  return fetchDataFromTable("jobs");
}
export async function getComments() {
  return fetchDataFromTable("comments");
}
export async function getReplies() {
  return fetchDataFromTable("commentReplies");
}
export async function getFriendsList() {
  return fetchDataFromTable("friends");
}
export async function getBoard() {
  return fetchDataFromTable("board");
}
export async function getTestimonials() {
  return fetchDataFromTable("speakersTestimonials");
}
export async function getRecommendations() {
  return fetchDataFromTable("recommendations");
}
export async function getBlogs() {
  return fetchDataFromTable("blogs");
}
