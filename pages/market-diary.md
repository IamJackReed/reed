---
layout: page
title: Market Diary
permalink: /market-diary/
description: Running log of trades, entries, exits and P/L.
---
<div class="mdiary-screen">
  <div class="mdiary-card">
    <header class="mdiary-header">
      <h1>Market Diary</h1>
      <p>
        Running log of trades I’ve taken. Numbers are indicative only, not advice.
      </p>
      <p class="mdiary-hint">
        Tip: edit this page in GitHub to add/remove rows. The P/L column is calculated in the browser.
      </p>
    </header>

    <div class="mdiary-table-wrap">
      <table class="mdiary-table" id="marketDiary">
        <thead>
          <tr>
            <th>Date In</th>
            <th>Stock</th>
            <th>EPIC</th>
            <th>Qty</th>
            <th>Buy (p)</th>
            <th>Target (p)</th>
            <th>Stop (p)</th>
            <th>Date Out</th>
            <th>Sell (p)</th>
            <th>P/L (£)</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <!-- EXAMPLE OPEN TRADE (no exit yet) -->
          <tr
            data-buy="111.5"
            data-sell=""
            data-qty="2500"
          >
            <td>15/10/2025</td>
            <td>Begbies Traynor</td>
            <td>BEG</td>
            <td>2,500</td>
            <td>111.5</td>
            <td>120</td>
            <td>105</td>
            <td>-</td>
            <td>-</td>
            <td class="pl-cell">—</td>
            <td>Holding – watching 105 stop.</td>
          </tr>

          <!-- EXAMPLE CLOSED TRADE -->
          <tr
            data-buy="366.5"
            data-sell="467.8"
            data-qty="1000"
          >
            <td>06/10/2025</td>
            <td>Tate &amp; Lyle</td>
            <td>TATE</td>
            <td>1,000</td>
            <td>366.5</td>
            <td>390</td>
            <td>340</td>
            <td>14/10/2025</td>
            <td>467.8</td>
            <td class="pl-cell"></td>
            <td>Target hit – banked.</td>
          </tr>

          <!-- ADD MORE ROWS ABOVE THIS COMMENT -->
        </tbody>
      </table>
    </div>
  </div>
</div>

<script>
  // simple P/L calculator:
  // assumes prices are in pence (UK style) so we divide by 100 to get £
  (function () {
    var rows = document.querySelectorAll('#marketDiary tbody tr');
    rows.forEach(function (row) {
      var buy = parseFloat(row.getAttribute('data-buy'));
      var sell = row.getAttribute('data-sell');
      var qty = parseFloat(row.getAttribute('data-qty'));
      var plCell = row.querySelector('.pl-cell');

      if (!plCell) return;

      if (sell && sell.trim() !== '') {
        sell = parseFloat(sell);
        if (!isNaN(buy) && !isNaN(sell) && !isNaN(qty)) {
          var pl = ((sell - buy) * qty) / 100; // p -> £
          var plText = (pl >= 0 ? '+' : '') + pl.toFixed(2);
          plCell.textContent = '£' + plText;
          plCell.classList.add(pl >= 0 ? 'pl-pos' : 'pl-neg');
        }
      } else {
        // open trade
        plCell.textContent = 'Open';
        plCell.classList.add('pl-open');
      }
    });
  })();
</script>
