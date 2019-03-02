let hostString;
if (process.env.NODE_ENV === "production") {
  hostString = "http://duke-it-out.azurewebsites.net";
} else {
  hostString = "http://localhost:5000";
}

export const HOST_STRING = hostString;