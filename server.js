const dotenv = require("dotenv");
const express = require("express");

dotenv.config();
const app = express();
const port = 4000;

const gitHubData = {
  login: "Argha782",
  id: 113825499,
  node_id: "U_kgDOBsjW2w",
  avatar_url: "https://avatars.githubusercontent.com/u/113825499?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/Argha782",
  html_url: "https://github.com/Argha782",
  followers_url: "https://api.github.com/users/Argha782/followers",
  following_url: "https://api.github.com/users/Argha782/following{/other_user}",
  gists_url: "https://api.github.com/users/Argha782/gists{/gist_id}",
  starred_url: "https://api.github.com/users/Argha782/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/Argha782/subscriptions",
  organizations_url: "https://api.github.com/users/Argha782/orgs",
  repos_url: "https://api.github.com/users/Argha782/repos",
  events_url: "https://api.github.com/users/Argha782/events{/privacy}",
  received_events_url: "https://api.github.com/users/Argha782/received_events",
  type: "User",
  user_view_type: "public",
  site_admin: false,
  name: "Argha Saha",
  company: null,
  blog: "",
  location: null,
  email: null,
  hireable: null,
  bio: null,
  twitter_username: null,
  public_repos: 5,
  public_gists: 0,
  followers: 0,
  following: 1,
  created_at: "2022-09-18T08:30:17Z",
  updated_at: "2025-03-25T06:51:48Z",
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/twitter", (req, res) => {
  res.send("ArghaSaha");
});

app.get("/login", (req, res) => {
  res.send("<h1>Please Login</h1>");
});

app.get("/github", (req, res) => {
  res.json(gitHubData);
});

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "A joke",
      content: "This is a joke"
    },
    {
      id: 2,
      title: "2nd joke",
      content: "This is a joke"
    },
    {
      id: 3,
      title: "3rd joke",
      content: "This is a joke"
    },
    {
      id: 4,
      title: "4th joke",
      content: "This is the final joke"
    }
  ];
  res.json(jokes);
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`);
});
