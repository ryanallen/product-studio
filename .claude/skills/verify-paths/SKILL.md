---
name: verify-paths
description: Compare work/paths.md to actual paths under work/ and verify they match. If not, hand off to documenter agent for document-paths. If no paths.md and no work folders, skip.
---

# Verify Paths

1. If `work/paths.md` does not exist and `work/paths.md.example` exists and there are no team/space/ticket-id/project folders under `work/`: do not create paths.md; skip (coordinator proceeds to updater).
2. If `work/paths.md` exists: read it, list actual folders under `work/`, verify tree matches.
3. If mismatch: hand off to **documenter** (step 2 of **Save** workflow in [Coordinator](../../agents/coordinator.md)).
4. Then run step 3 of the **Save** workflow in [Coordinator](../../agents/coordinator.md).
