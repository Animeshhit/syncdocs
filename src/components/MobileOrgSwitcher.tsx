"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";

export function MobileOrgSwitcher() {
  return (
    <OrganizationSwitcher
      hidePersonal={false}
      afterSelectOrganizationUrl="/"
      afterSelectPersonalUrl="/"
      appearance={{
        elements: {
          organizationSwitcherTrigger: {
            padding: 0,
            margin: 0,
            gap: 0,
            height: "40px",
            width: "40px",
            minWidth: "40px",
            borderRadius: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          },
          // Wrapper inside the trigger only (name+avatar pair)
          organizationPreview__organizationSwitcherTrigger: {
            padding: 0,
            margin: 0,
            gap: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            inset: 0,
          },
          // Wrapper inside the trigger only (personal account case)
          userPreview__organizationSwitcherTrigger: {
            padding: 0,
            margin: 0,
            gap: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            inset: 0,
          },
          // Hide the text, scoped to the trigger only — popover rows keep their names
          organizationPreviewMainIdentifier__organizationSwitcherTrigger: {
            display: "none",
          },
          organizationPreviewSecondaryIdentifier__organizationSwitcherTrigger: {
            display: "none",
          },

          organizationPreviewAvatarContainer: {
            height: "40px",
            width: "40px",
            borderRadius: "9999px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          organizationSwitcherTriggerIcon: "hidden",

          // Popover list styling (untouched, name stays visible here)
          organizationSwitcherPopoverCard:
            "dark:bg-zinc-900 dark:border-zinc-800",
          organizationSwitcherPopoverActionButton: "dark:text-zinc-100",
          organizationPreviewMainIdentifier: "dark:text-zinc-100",
          organizationPreviewSecondaryIdentifier: "dark:text-zinc-400",
        },
      }}
    />
  );
}
