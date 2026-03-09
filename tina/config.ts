import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const ctaTemplate:{
  name:string,
  label:string,
  fields:any
} = {
  name: "cta",
  label: "Call to Action",
  fields: [
    { type: "image", name: "cta_img", label: "CTA Image" },
    { type: "string", name: "cta_title", label: "CTA Title", ui: { defaultValue: "Take the first step of your healing" }},
    { type: "rich-text", name: "cta_body", label: "CTA Body"},
    { type: "string", name: "button", label: "CTA Button Text" },
    { type: "string", name: "button_link", label: "CTA Button Link"}
  ]
};
const pageBanner:{
  name:string,
  label:string,
  fields:any  
} = {
  name: "page_banner",
  label: "Page Banner",
  fields: [
    { type: "image", name: "page_banner_img", label: "Banner Image" },
    { type: "string", name: "page_banner_title", label: "Banner Title"},
  ]
}
const richTextArticle:{
  name:string,
  label:string,
  fields:any   
} = {
  name: "article_body",
  label: "Body",
  fields: [
    { type: "rich-text", name: "article_body_field", label: "Body"},
  ]
}

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
      {
        name: "home",
        label: "Home Page",
        path: "content/home",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true
          },
          {
            type: "object",
            name: "page_blocks",
            label: "Page Blocks",
            list: true,
            templates: [
              {
                name: "banner_home",
                label: "Home Banner",
                fields: [
                  { type: "string", name: "banner_header", label: "Banner Header" },
                  { type: "image", name: "banner_img", label: "Banner Image" },
                  { type: "string", name: "banner_button_text", label: "Button Text" },
                  { type: "string", name: "banner_url", label: "Button URL" },
                ]
              },
              {
                name: "featured_quote",
                label: "Featured Quote",
                fields: [
                  { type: "string", name: "line", label: "Line" }
                ]
              },
              {
                name: "twocol_paragraph",
                label: "Two Columns Text Block",
                fields: [
                  { type: "rich-text", name: "title", label: "Title" },
                  { type: "rich-text", name: "body", label: "Body" },
                ]
              },
              ctaTemplate,
            ]
          }
        ],
        ui: {
          router: ({ document }) => '/',  // Points to your home page route
        }
      },
      {
        name: "about",
        label: "About Page",
        path: "content/about",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true
          },
          {
            type: "object",
            name: "page_blocks",
            label: "Page Blocks",
            list: true,
            templates: [
              pageBanner,
              richTextArticle
            ]
          }
        ],
        ui: {
          router: ({ document }) => '/about',
        }        
      }
    ],
  },
});
