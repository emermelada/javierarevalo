---
title: ArtCenter
tagline: 'An Android app for artistic disciplines: a browsable catalogue of techniques wrapped around a social feed where artists post their own work.'
year: '2025'
role: Final degree project · Android app & REST API
stack: [Kotlin, Jetpack Compose, MVVM, Hilt, Python, Flask, JWT, MySQL, Cloudinary]
summary: A native Android client and the REST API behind it, built as my final project for the DAM degree at U-tad. Two repositories that make up one system.
order: 1
status: shipped
statusNote: Delivered June 2025
links:
  - label: Android app
    url: https://github.com/emermelada/ArtCenter
  - label: REST API
    url: https://github.com/emermelada/artcenter_api
gallery:
  - src: /work/artcenter-feed.jpg
    alt: The ArtCenter feed on a phone, a two-column grid of user artwork with each card labelled by its technique.
    caption: The feed, paginated, with every post tagged by technique
    width: 560
    height: 1141
  - src: /work/artcenter-post-detail.jpg
    alt: An ArtCenter post detail screen showing a charcoal portrait, its publication date, likes, save and comment controls.
    caption: A post in detail, with likes, saves and comments
    width: 560
    height: 1141
  - src: /work/artcenter-admin-categories.jpg
    alt: The ArtCenter administration screen listing the categories Pintura, Escultura, Dibujo and Grabado, each with an edit control.
    caption: The administration panel for categories and subcategories, open to admins only
    width: 560
    height: 1141
---

## Problem

Learning an artistic technique and showing the results are usually two
different places on the internet: a reference site that explains what
etching is, and a social network where nobody explains anything. I wanted one
app where the catalogue and the community sit next to each other, so the thing
you just read about is the thing you can immediately see other people doing.

As a final degree project it also had to be built end to end, so consuming
someone else's API and calling it a system was not an option.

## Solution

**The client** is native Android in Kotlin: Jetpack Compose with Material 3,
MVVM with one ViewModel per screen exposing a `StateFlow` and a sealed
`UiState`, Hilt for dependency injection, Retrofit over OkHttp for the network
layer, and Coil for images.

**The API** is Python and Flask with raw SQL over PyMySQL (no ORM) against
MySQL 8, with authentication by JWT, image hosting on Cloudinary, and the
whole surface documented with OpenAPI 3 and served through Swagger UI.

Three decisions took most of the work:

- **Pagination on scroll.** The API returns the feed in pages of twenty. On the
  client, `FeedScreen` watches the grid's `layoutInfo` with `snapshotFlow` and
  requests the next page as the last visible item approaches the end, so the
  user never has to notice a page boundary. Most of the work went into the
  guard, since `snapshotFlow` emits far more often than pages need loading.
- **A single publication component.** The same card appears in the feed, the
  profile and search results, with a different context menu in each: a
  stranger's post can be liked and saved, your own can also be deleted, and an
  administrator can delete any of them. It takes `userRole` and `isOwner` and
  decides for itself, so the permission rule lives in one file rather than
  three.
- **Likes and saves resolved in one query.** Whether the current user has liked
  or saved each post comes back with the feed itself, through a `LEFT JOIN`
  against the relationship tables, instead of one follow-up request per card.

## Result

A working system: registration and login, user and administrator roles carried
in the token, a paginated feed, tagged posts, likes, saves, comments, search,
profile management, and an administration panel for the discipline catalogue.

Both repositories are documented with full READMEs, and the app repository
includes recorded walkthroughs of the user and administrator flows. The backend
is not deployed: it runs locally against MySQL, and the client points at it by
configuration.
