import { Queries } from "@/types/github";

export const getPinnedRepos = async () => {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    cache: "force-cache",
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

      gists: pinnedItems(first: 6, types: GIST) {
        nodes {
          ... on Gist {
            createdAt
            description
            id
            name
            stargazerCount
            url
          }
        }
      }
    }
  }
}
      `,
    }),
  });

  const data = (await res.json()) as {
    data: {
      repositoryOwner: {
        repos: Queries["repositoryOwner"]["pinnedItems"];
        gists: Queries["repositoryOwner"]["pinnedItems"];
      };
    };
  };

  return data;
};
