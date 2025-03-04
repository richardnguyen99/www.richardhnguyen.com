import { Queries } from "@/types/github";

async function getPinnedRepos() {
  // Uncomment the following line to simulate a slow network
  // const r = Math.floor(Math.random() * (4 - 1 + 1) + 1);
  // await new Promise((resolve) => setTimeout(resolve, r * 1000));

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    next: {
      revalidate: 60 * 60, // 1 hour
    },
    body: JSON.stringify({
      query: `#graphql
{
  repositoryOwner(login: "${process.env.GITHUB_USER_NAME}") {
    ... on User {
      repos: pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            descriptionHTML
            forkCount
            homepageUrl
            id
            stargazerCount
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
            url
          }
        }
      }

      gists: gists(first: 6, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          createdAt
          description
          id
          name
          stargazerCount
          url
          files {
            text
            name
          }
        }
      }
    }
  }
}
      `,
    }),
  });

  //const data = (await res.json()) as {
  //data: {
  //repositoryOwner: {
  //repos: Queries["repositoryOwner"]["pinnedItems"];
  //gists: Queries["repositoryOwner"]["pinnedItems"];
  //};
  //};
  //};

  return res.json() as Promise<{
    data: {
      repositoryOwner: {
        repos: Queries["repositoryOwner"]["pinnedItems"];
        gists: Queries["repositoryOwner"]["pinnedItems"];
      };
    };
  }>;
}

export default getPinnedRepos;
