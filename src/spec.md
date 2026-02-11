# Specification

## Summary
**Goal:** Implement a premium, mobile-first THAI LOTTERY app UI with fixed bottom navigation and fully working flows for playing games, viewing results, ticket booking, and deposit/withdraw submissions.

**Planned changes:**
- Build the Home page with 8 sections in the exact specified order, including header icons, hero image with post-load fade-in overlay text, animated line-by-line info banner, two LIVE result cards (308 and 629) with PLAY NOW, game rate table, auto-scrolling VIP WINNERS list, quick play buttons, and OLD RESULT / RESULT HISTORY navigation.
- Add a fixed bottom navigation (Home, Deposit, Withdraw) that remains visible across all pages and routes correctly.
- Implement the Game Play page with game context, balance display, play-type dropdown, multiple bet rows (numeric bet number + SAR amount), summary (total/discount/final), and SUBMIT showing “Bet Successful”, wired to a backend success method.
- Implement the Results page with a scrollable date-wise list (game name, date, time, winning number) and support opening with the correct pre-filtered datasets for Thai history (5 entries), Bangkok history (6 entries), and OLD RESULT / RESULT HISTORY.
- Implement the Ticket Booking page opened from “TICKET BOOKING”, with the exact required inputs and submit showing confirmation plus a message containing “Processing”, wired to a backend success method.
- Implement Deposit and Withdraw pages reachable only via bottom navigation, each with a functional form submission and success feedback.
- Ensure all specified buttons/routes work with no dead links; add route-level unknown-route handling that redirects to Home (without adding a new page).

**User-visible outcome:** Users can navigate between Home/Deposit/Withdraw via a fixed bottom bar, start Bangkok Weekly or Thailand Lottery bets and submit successfully, view results/history lists, submit ticket bookings, and complete basic deposit/withdraw form submissions with success feedback.
