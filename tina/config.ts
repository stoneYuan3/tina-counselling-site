import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const buttonTemplate = {
  name:"link_button",
  label:"Button",
  fields: [
    { type: "string", name: "button_text", label: "Button Text" },
    { type: "string", name: "button_url", label: "Button URL" },
  ]
}

const ctaTemplate = {
  name: "cta",
  label: "Call to Action",
  fields: [
    { type: "image", name: "cta_img", label: "CTA Image" },
    { type: "string", name: "cta_title", label: "CTA Title" },
    { type: "rich-text", name: "cta_body", label: "CTA Body" },
    { type: "object", name: "cta_button", label: "CTA Button", fields: buttonTemplate.fields },
  ],
  ui: {
    defaultItem: () => ({
      cta_title: "Ready to get started?",
      cta_body: {
        type: "root",
        children: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Maecenas quis quam felis. Nunc aliquet neque sit amet dapibus malesuada. Nunc fermentum, elit vitae commodo tempor, enim elit facilisis risus.",
              },
            ],
          },
        ],
      },
      cta_img: "./img/cta.png",
      cta_button: { button_text: "Get Started", button_url: "/service" }
    }),
  },
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
const titleAndText = {
  name: "center_title_text",
  label: "Centered Title and Text",
  fields: [
    { type: "string", name: "title", label: "Title" },
    { type: "rich-text", name: "center_body", label: "Body" },        
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
        name: "global",
        label: "Site Settings",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
        },
        fields: [
          {
            type: "object",
            name: "header",
            label: "Header",
            fields: [
              { type: "string", name: "site_title", label: "Site Title" },
              {
                type: "object",
                name: "nav",
                label: "Nav Links",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "url", label: "URL" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "rich-text", name: "crisis_notice", label: "Crisis Notice" },
              { type: "string", name: "land_acknowledgement", label: "Land Acknowledgement", ui: { component: "textarea" } },
              { type: "string", name: "copyright", label: "Copyright Text" },
            ],
          },
        ],
      },
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
                  { type: "object", name: "banner_button", label: "Banner Button", fields: buttonTemplate.fields}

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
              richTextArticle,
              ctaTemplate
            ]
          }
        ],
        ui: {
          router: ({ document }) => '/about',
        }        
      },
      {
        name: "service",
        label: "Service Page",
        path: "content/service",
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
              {
                name: "service_intro",
                label: "Service Intro",
                fields: [
                  { type: "string", name: "service_intro_title", label: "Intro Header" },
                  { type: "rich-text", name: "service_intro_text", label: "Intro Body" },
                ]
              },
              {
                name: "service_options",
                label: "Service Options",
                fields: [
                  { type: "object", name: "new_client", label: "New Client", fields: titleAndText.fields },
                  { type: "object", name: "return_client", label: "Returning Client", fields: titleAndText.fields },
                  { type: 'string', name: "option_desc", label:"Option Description"},
                  { type: "object", name: "book_link", label: "Book Link", fields: buttonTemplate.fields},
                ]
              },
              {
                name: "rates_policies",
                label: "Rates and Policy",
                fields: [
                  { type: "string", name: "policy_title", label: "Title"},
                  { type: "object", name: "policy_item", label: "Policy Items", fields: titleAndText.fields, list:true}
                ]
              },
              ctaTemplate
            ]
          }
        ],
        ui: {
          router: ({ document }) => '/service',
        }
      }
    ],
  },
});
