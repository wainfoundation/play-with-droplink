# Component Tree Documentation

## Overview

This document describes the React component hierarchy for the Droplet Pet App UI. It helps developers understand the layout, modularization, and where features reside.

---

## Component Tree

```
<App>
 ├── <AuthProvider>
 ├── <Router>
 │    ├── <WelcomePage>
 │    │    ├── <CharacterSelection>
 │    │    │    └── <CharacterCard>
 │    │    └── <StartButton>
 │    ├── <MainLayout>
 │    │    ├── <Header>
 │    │    │    ├── <WalletDisplay>
 │    │    │    ├── <CoinBalance>
 │    │    │    └── <UserMenu>
 │    │    ├── <Sidebar>
 │    │    │    ├── <RoomNavigation>
 │    │    │    ├── <StatsSummary>
 │    │    │    └── <InventoryQuickAccess>
 │    │    ├── <MainContent>
 │    │    │    ├── <RoomView>
 │    │    │    │    ├── <RoomBackground>   (renders theme)
 │    │    │    │    ├── <RoomItems>        (items placed in room)
 │    │    │    │    └── <DropletMascot>    (main pet character)
 │    │    │    │         ├── <FacialExpression>
 │    │    │    │         ├── <MoodIndicator>
 │    │    │    │         └── <AnimationController>
 │    │    │    ├── <ShopPage>
 │    │    │    │    ├── <ShopCategories>
 │    │    │    │    ├── <ShopItemList>
 │    │    │    │    │    └── <ShopItemCard>
 │    │    │    │    └── <PurchaseModal>
 │    │    │    ├── <InventoryPage>
 │    │    │    │    ├── <InventoryList>
 │    │    │    │    │    └── <InventoryItemCard>
 │    │    │    │    └── <EquipButton>
 │    │    │    ├── <CoinStorePage>
 │    │    │    │    ├── <PiPurchaseOptions>
 │    │    │    │    ├── <WatchAdButton>
 │    │    │    │    └── <CoinBalanceDisplay>
 │    │    │    ├── <StatsPage>
 │    │    │    │    ├── <EnergyStat>
 │    │    │    │    ├── <HungerStat>
 │    │    │    │    ├── <HealthStat>
 │    │    │    │    └── <LevelProgressBar>
 │    │    │    ├── <MiniGamesPage> (placeholder for future minigames)
 │    │    │    └── <Notifications>
 │    │    └── <Footer>
 │    └── <NotFoundPage>
 └── <GlobalModals>
      ├── <ConfirmDialog>
      ├── <AlertDialog>
      └── <LoadingSpinner>
```

---

## Component Descriptions

### App

* Root component initializes routing and global state providers.

### AuthProvider

* Handles user session state and authentication (planned for future login integration).

### WelcomePage

* Entry page for user character selection and onboarding.

### CharacterSelection

* Lists available Droplet characters for user to choose.

### CharacterCard

* Displays character preview, stats, and selection button.

### MainLayout

* Main app container with header, sidebar, and content area.

### Header

* Displays wallet, user info, and navigation controls.

### WalletDisplay & CoinBalance

* Show current user coin and Pi balances.

### Sidebar

* Navigation for rooms, quick access to stats and inventory.

### RoomNavigation

* Buttons or tabs to switch between rooms (Bedroom, Play, Bath, etc.)

### StatsSummary

* Quick overview of pet’s health, energy, hunger, and mood.

### InventoryQuickAccess

* Mini view of inventory for fast item use or equip.

### MainContent

* Dynamic content area that changes with routes (Room view, Shop, Inventory, etc.)

### RoomView

* Renders the current room’s background, items, and pet mascot.

### RoomBackground

* Loads the theme for the selected room.

### RoomItems

* Renders interactive objects in the room (lamp, ball, food plate, etc.)

### DropletMascot

* The main pet character with animations and facial expressions.

### FacialExpression

* Displays pet’s current emotional expression based on mood and stats.

### MoodIndicator

* Shows text or icons representing the pet’s mood.

### AnimationController

* Manages animation states (sleeping, eating, playing).

### ShopPage

* Displays available items for purchase with coins or Pi.

### ShopCategories

* Filters shop items by categories (Food, Clothes, Medicine, Themes).

### ShopItemList & ShopItemCard

* List and individual card components for each shop item.

### PurchaseModal

* Confirmation dialog for buying items.

### InventoryPage

* Shows all user-owned items, allows equipping or using.

### InventoryList & InventoryItemCard

* Inventory item list and individual items.

### EquipButton

* Button to equip an item from inventory.

### CoinStorePage

* Interface to buy coins with Pi or earn by watching ads.

### PiPurchaseOptions

* Displays available Pi-to-coin purchase packages.

### WatchAdButton

* Button for user to watch rewarded ads to earn coins.

### CoinBalanceDisplay

* Shows updated coin balance in the store.

### StatsPage

* Detailed stats with graphical bars for energy, hunger, health, level progress.

### EnergyStat, HungerStat, HealthStat

* Individual stat components with icons and progress bars.

### LevelProgressBar

* Visual progress bar for pet’s XP and level.

### MiniGamesPage

* Placeholder page for future mini-game integrations.

### Notifications

* Global notifications for user actions and system messages.

### Footer

* Application footer with info/links.

### NotFoundPage

* 404 page for invalid routes.

### GlobalModals

* Centralized modal components for confirmation, alerts, loading spinners.

---

