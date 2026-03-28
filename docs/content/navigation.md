# Navigation

The `src/data/navigation.json` file controls the links in the header and footer.

## Structure

```json
{
  "main": [
    { "label": "Home", "href": "/" },
    { "label": "About", "href": "/about" },
    { "label": "Work", "href": "/work" }
  ],
  "footer": [
    {
      "title": "Explore",
      "links": [
        { "label": "Work", "href": "/work" }
      ]
    }
  ]
}
```

## Main Navigation

The `main` array defines the primary navigation links shown in the header. On desktop, these appear as a horizontal pill-style nav bar. On mobile, they appear in a dropdown menu triggered by the hamburger icon.

The current page is highlighted automatically based on the URL path.

## Footer Navigation

The `footer` array defines grouped link sections shown in the site footer. Each group has a `title` and an array of `links`.

## Adding or Removing Pages

To add a new page to the navigation:

1. Create the page file in `src/pages/`
2. Add an entry to the `main` array with the correct `label` and `href`
3. Optionally add it to a `footer` section

To remove a page from the navigation, remove its entry from the arrays. The page file can remain if you want the URL to still work without it appearing in the nav.
