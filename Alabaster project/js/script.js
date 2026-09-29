/* ============================================================
   Alabaster Health & Aesthetics — Master JavaScript
   Navy theme · No emojis · WhatsApp + Formspree email
   Booking reset on confirmation
   ============================================================ */

(function () {
    'use strict';

    /* ============================================================
       CONFIG — Edit these values
       ============================================================ */
    const PAYMENT_LINK = "PAYMENT_LINK_HERE"; // Replace with PayFast/Yoco URL
    const BOOKING_FEE = 200;
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORMSPREE_ID"; // Replace with your real ID

    const BRANCHES = {
        bedfordview: {
            name: "Alabaster Bedfordview",
            short: "Bedfordview",
            address: "12 Nicol Road, Bedfordview, Johannesburg, 2007",
            phone: "081 309 4084",
            whatsapp: "27813094084",
            whatsappDisplay: "081 309 4084",
            hours: { start: 8.5, end: 17.5, days: [1, 2, 3, 4, 5, 6] }
        },
        benoni: {
            name: "Alabaster Benoni",
            short: "Benoni",
            address: "65 Ampthill Avenue, Benoni Central, 1501",
            phone: "076 042 6155",
            whatsapp: "27760426155",
            whatsappDisplay: "076 042 6155",
            hours: { start: 8, end: 17, days: [1, 2, 3, 4, 5, 6] }
        },
        pretoria: {
            name: "Alabaster Pretoria",
            short: "Pretoria",
            address: "Suite 9, Menlyn Maine, Aramist Ave, Waterkloof Glen, Pretoria, 0181",
            phone: "067 032 1210",
            whatsapp: "27670321210",
            whatsappDisplay: "067 032 1210",
            hours: { start: 8.5, end: 17, days: [1, 2, 3, 4, 5, 6] }
        },
        polokwane: {
            name: "Alabaster Polokwane",
            short: "Polokwane",
            address: "Central Business District, Polokwane, 0699",
            phone: "081 309 4084",
            whatsapp: "27813094084",
            whatsappDisplay: "081 309 4084",
            hours: { start: 9, end: 16.5, days: [2, 3, 4, 5, 6] }
        }
    };

    const PAYMENT_METHOD_LABELS = {
        paynow: "PayNow (Card)",
        eft: "EFT / Bank Transfer",
        cash: "Cash at Clinic"
    };

    const BANK_DETAILS = {
        bank: "Capitec",
        accountName: "Alabaster Health",
        accountNumber: "1659931620",
        branchCode: "953",
        accountType: "Savings"
    };

    /* ============================================================
       1. HEADER SCROLL EFFECT
       ============================================================ */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) header.classList.add('header--scrolled');
            else header.classList.remove('header--scrolled');
        });
    }

    /* ============================================================
       2. MOBILE NAVIGATION
       ============================================================ */
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const navOverlay = document.getElementById('navOverlay');

    function closeNav() {
        if (!nav || !navToggle) return;
        nav.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.classList.remove('menu-open');
        if (navOverlay) navOverlay.classList.remove('active');
    }

    function openNav() {
        if (!nav || !navToggle) return;
        nav.classList.add('open');
        navToggle.classList.add('open');
        document.body.classList.add('menu-open');
        if (navOverlay) navOverlay.classList.add('active');
    }

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            if (nav.classList.contains('open')) closeNav();
            else openNav();
        });
    }

    if (navOverlay) navOverlay.addEventListener('click', closeNav);

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    /* ============================================================
       3. GALLERY FILTERS
       ============================================================ */
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    if (filterButtons.length > 0 && galleryCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                galleryCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || filter === category) {
                        card.classList.remove('is-hidden');
                    } else {
                        card.classList.add('is-hidden');
                    }
                });
            });
        });
    }

    /* ============================================================
       4. GALLERY LIGHTBOX
       ============================================================ */
    window.openGalleryModal = function (id) {
        const card = document.querySelector(`.gallery-card[data-id="${id}"]`);
        if (!card) return;
        const modal = document.getElementById('galleryModal');
        if (!modal) return;

        const img = card.querySelector('.gallery-card__image');
        const branch = card.querySelector('.gallery-card__badge-branch');
        const category = card.querySelector('.gallery-card__badge-category');
        const title = card.querySelector('.gallery-card__title');
        const treatment = card.querySelector('.gallery-card__treatment');
        const quote = card.querySelector('.gallery-card__quote');

        const modalImg = document.getElementById('modalImg');
        const modalBranch = document.getElementById('modalBranch');
        const modalCategory = document.getElementById('modalCategory');
        const modalTitle = document.getElementById('modalTitle');
        const modalTreatment = document.getElementById('modalTreatment');
        const modalQuote = document.getElementById('modalQuote');

        if (modalImg && img) {
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        }
        if (modalBranch && branch) modalBranch.innerHTML = branch.innerHTML;
        if (modalCategory && category) modalCategory.textContent = category.textContent;
        if (modalTitle && title) modalTitle.innerHTML = title.innerHTML;
        if (modalTreatment && treatment) modalTreatment.innerHTML = treatment.innerHTML;
        if (modalQuote && quote) modalQuote.textContent = quote.textContent;

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modal.dataset.currentId = id;
    };

    window.closeGalleryModal = function () {
        const modal = document.getElementById('galleryModal');
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    window.prevStory = function () {
        const modal = document.getElementById('galleryModal');
        if (!modal) return;
        const currentId = parseInt(modal.dataset.currentId || '1', 10);
        const visible = Array.from(document.querySelectorAll('.gallery-card:not(.is-hidden)'));
        const ids = visible.map(c => parseInt(c.getAttribute('data-id'), 10));
        const idx = ids.indexOf(currentId);
        const prevId = idx <= 0 ? ids[ids.length - 1] : ids[idx - 1];
        window.openGalleryModal(prevId);
    };

    window.nextStory = function () {
        const modal = document.getElementById('galleryModal');
        if (!modal) return;
        const currentId = parseInt(modal.dataset.currentId || '1', 10);
        const visible = Array.from(document.querySelectorAll('.gallery-card:not(.is-hidden)'));
        const ids = visible.map(c => parseInt(c.getAttribute('data-id'), 10));
        const idx = ids.indexOf(currentId);
        const nextId = idx >= ids.length - 1 ? ids[0] : ids[idx + 1];
        window.openGalleryModal(nextId);
    };

    window.toggleLike = function (btn, id) {
        btn.classList.toggle('liked');
        const countEl = btn.querySelector('.like-count');
        if (!countEl) return;
        let count = parseInt(countEl.textContent, 10) || 0;
        if (btn.classList.contains('liked')) count += 1;
        else count = Math.max(0, count - 1);
        countEl.textContent = count;
    };

    /* ============================================================
       5. BOOKING ENGINE v4 — Payment methods + reset
       ============================================================ */
    const bookingState = {
        branch: null,
        date: null,
        time: null,
        service: null,
        clientName: "",
        clientPhone: "",
        notes: "",
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        selectedDay: null,
        reference: null,
        paymentMethod: null
    };

    window.selectBranch = function (branchKey) {
        if (!BRANCHES[branchKey]) return;

        bookingState.branch = branchKey;
        bookingState.date = null;
        bookingState.time = null;
        bookingState.selectedDay = null;

        document.querySelectorAll('.booking-location-card').forEach(c => c.classList.remove('selected'));
        const card = document.querySelector(`.booking-location-card[data-branch="${branchKey}"]`);
        if (card) card.classList.add('selected');

        const label = document.getElementById('selectedBranchLabel');
        if (label) label.textContent = BRANCHES[branchKey].name;

        updateStepper(2);

        const dateSection = document.getElementById('datetimeSection');
        const detailSection = document.getElementById('detailsSection');
        const paySection = document.getElementById('paymentSection');

        if (dateSection) dateSection.style.display = 'block';
        if (detailSection) detailSection.style.display = 'none';
        if (paySection) paySection.style.display = 'none';

        setTimeout(() => {
            if (dateSection) dateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);

        renderCalendar();
    };

    window.navigateMonth = function (dir) {
        bookingState.currentMonth += dir;
        if (bookingState.currentMonth > 11) {
            bookingState.currentMonth = 0;
            bookingState.currentYear++;
        }
        if (bookingState.currentMonth < 0) {
            bookingState.currentMonth = 11;
            bookingState.currentYear--;
        }
        renderCalendar();
    };

    function renderCalendar() {
        const grid = document.getElementById('calendarGrid');
        const label = document.getElementById('calMonthYear');
        if (!grid || !label || !bookingState.branch) return;

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        label.textContent = `${monthNames[bookingState.currentMonth]} ${bookingState.currentYear}`;
        grid.innerHTML = '';

        const firstDay = new Date(bookingState.currentYear, bookingState.currentMonth, 1);
        const daysInMonth = new Date(bookingState.currentYear, bookingState.currentMonth + 1, 0).getDate();
        const startWeekday = (firstDay.getDay() + 6) % 7;

        for (let i = 0; i < startWeekday; i++) {
            const empty = document.createElement('div');
            empty.className = 'cal-day cal-day--empty';
            grid.appendChild(empty);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const branch = BRANCHES[bookingState.branch];

        for (let d = 1; d <= daysInMonth; d++) {
            const cellDate = new Date(bookingState.currentYear, bookingState.currentMonth, d);
            const dayOfWeek = cellDate.getDay();

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'cal-day';
            btn.textContent = d;

            const isPast = cellDate < today;
            const isToday = cellDate.getTime() === today.getTime();
            const isBranchOpen = branch.hours.days.includes(dayOfWeek);

            if (isToday) btn.classList.add('cal-day--today');

            if (isPast || !isBranchOpen) {
                btn.classList.add('cal-day--disabled');
                btn.disabled = true;
            } else {
                btn.classList.add('cal-day--has-slots');
                btn.onclick = () => selectDate(cellDate, btn);
            }

            if (bookingState.selectedDay === d &&
                bookingState.currentMonth === cellDate.getMonth() &&
                bookingState.currentYear === cellDate.getFullYear()) {
                btn.classList.add('cal-day--selected');
            }

            grid.appendChild(btn);
        }
    }

    function selectDate(dateObj, btnEl) {
        bookingState.date = dateObj;
        bookingState.selectedDay = dateObj.getDate();
        bookingState.time = null;

        document.querySelectorAll('.cal-day').forEach(c => c.classList.remove('cal-day--selected'));
        btnEl.classList.add('cal-day--selected');

        const tsCard = document.getElementById('timeslotsCard');
        if (tsCard) tsCard.style.display = 'none';
    }

    window.scrollToTimeSlots = function () {
        if (!bookingState.date) {
            alert("Please select a date on the calendar first.");
            return;
        }
        renderTimeSlots();
        const tsCard = document.getElementById('timeslotsCard');
        if (tsCard) {
            tsCard.style.display = 'block';
            tsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    function renderTimeSlots() {
        if (!bookingState.branch || !bookingState.date) return;
        const branch = BRANCHES[bookingState.branch];
        const { start, end } = branch.hours;

        const dateLabel = document.getElementById('slotDateLabel');
        if (dateLabel) {
            const opts = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
            dateLabel.textContent = bookingState.date.toLocaleDateString('en-ZA', opts);
        }

        const morning = [];
        const afternoon = [];
        const evening = [];

        for (let h = start; h < end; h += 0.5) {
            const hour24 = Math.floor(h);
            const mins = (h % 1) === 0 ? '00' : '30';
            const timeLabel = formatTime(hour24, mins);

            if (h < 12) morning.push(timeLabel);
            else if (h < 15) afternoon.push(timeLabel);
            else evening.push(timeLabel);
        }

        fillSlots('morningSlots', morning);
        fillSlots('afternoonSlots', afternoon);
        fillSlots('eveningSlots', evening);
    }

    function fillSlots(containerId, slots) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';

        if (slots.length === 0) {
            container.innerHTML = '<span style="font-size:0.85rem; color: var(--muted-text);">No slots available</span>';
            return;
        }

        slots.forEach(time => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'time-slot-pill';
            btn.textContent = time;
            btn.onclick = () => selectTimeSlot(time, btn);
            container.appendChild(btn);
        });
    }

    function selectTimeSlot(time, btnEl) {
        bookingState.time = time;
        document.querySelectorAll('.time-slot-pill').forEach(p => p.classList.remove('selected'));
        btnEl.classList.add('selected');

        const detailSection = document.getElementById('detailsSection');
        if (detailSection) detailSection.style.display = 'block';

        updateStepper(3);

        setTimeout(() => {
            if (detailSection) detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
    }

    function formatTime(h, m) {
        const suffix = h < 12 ? 'AM' : 'PM';
        const hour12 = h === 0 ? 12 : (h > 12 ? h - 12 : h);
        return `${hour12}:${m} ${suffix}`;
    }

    window.updateSummary = function () {
        const nameEl = document.getElementById('clientName');
        const phoneEl = document.getElementById('clientPhone');
        const serviceEl = document.getElementById('bookingServiceSelect');
        const notesEl = document.getElementById('clientNotes');

        if (nameEl) bookingState.clientName = nameEl.value.trim();
        if (phoneEl) bookingState.clientPhone = phoneEl.value.trim();
        if (serviceEl) bookingState.service = serviceEl.value;
        if (notesEl) bookingState.notes = notesEl.value.trim();

        if (bookingState.clientName && bookingState.clientPhone &&
            bookingState.service && bookingState.time) {
            const paySection = document.getElementById('paymentSection');
            if (paySection) paySection.style.display = 'block';
            updateStepper(4);
            populatePaymentSummary();

            if (!bookingState.reference) {
                bookingState.reference = generateReference();
                const eftRef = document.getElementById('eftReference');
                if (eftRef) eftRef.textContent = bookingState.reference;
            }
        }
    };

    function populatePaymentSummary() {
        if (!bookingState.branch || !bookingState.date) return;
        const branch = BRANCHES[bookingState.branch];
        const dateOpts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

        setText('sumBranch', branch.name);
        setText('sumDate', bookingState.date.toLocaleDateString('en-ZA', dateOpts));
        setText('sumTime', bookingState.time);
        setText('sumService', bookingState.service);
        setText('sumClient', bookingState.clientName);
        setText('sumPhone', bookingState.clientPhone);
    }

    function setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value || '-';
    }

    /* ---------- Payment method selection ---------- */
    window.selectPaymentMethod = function (method) {
        bookingState.paymentMethod = method;

        document.querySelectorAll('.payment-method-option').forEach(opt => {
            opt.classList.remove('active');
        });

        const selected = document.querySelector(`.payment-method-option[data-method="${method}"]`);
        if (selected) selected.classList.add('active');
    };

    window.openPaymentLink = function () {
        if (PAYMENT_LINK && PAYMENT_LINK !== "PAYMENT_LINK_HERE") {
            window.open(PAYMENT_LINK, '_blank');
        } else {
            alert("Payment link is not configured yet. Please contact the branch directly or choose EFT / Cash at Clinic.");
        }
    };

    window.copyBankDetails = function () {
        const text = `Bank: ${BANK_DETAILS.bank}
Account Name: ${BANK_DETAILS.accountName}
Account Number: ${BANK_DETAILS.accountNumber}
Branch Code: ${BANK_DETAILS.branchCode}
Account Type: ${BANK_DETAILS.accountType}
Reference: ${bookingState.reference || 'ALB-0000'}`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                alert("Bank details copied to clipboard.");
            }).catch(() => {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    };

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            alert("Bank details copied to clipboard.");
        } catch (e) {
            alert("Please manually copy the bank details.");
        }
        document.body.removeChild(ta);
    }

    /* ---------- Confirm booking ---------- */
    window.confirmBooking = function () {
        if (!validateBooking()) return;
        if (!bookingState.paymentMethod) {
            alert("Please select a payment method first.");
            return;
        }

        const branch = BRANCHES[bookingState.branch];
        const ref = bookingState.reference || generateReference();
        bookingState.reference = ref;

        const waMsg = buildWhatsAppMessage(branch, ref);

        if (bookingState.paymentMethod === 'paynow' &&
            PAYMENT_LINK && PAYMENT_LINK !== "PAYMENT_LINK_HERE") {
            window.open(PAYMENT_LINK, '_blank');
        }

        sendEmailNotification(branch, ref);

        setTimeout(() => {
            window.open(`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(waMsg)}`, '_blank');
        }, 500);

        showConfirmModal(branch, ref);
    };

    window.confirmViaWhatsApp = function () {
        if (!validateBooking()) return;
        if (!bookingState.paymentMethod) {
            alert("Please select a payment method first.");
            return;
        }
        const branch = BRANCHES[bookingState.branch];
        const ref = bookingState.reference || generateReference();
        bookingState.reference = ref;

        const waMsg = buildWhatsAppMessage(branch, ref);
        window.open(`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(waMsg)}`, '_blank');
        sendEmailNotification(branch, ref);
        showConfirmModal(branch, ref);
    };

    function validateBooking() {
        if (!bookingState.branch || !bookingState.date || !bookingState.time) {
            alert("Please complete Steps 1 and 2 first.");
            return false;
        }
        if (!bookingState.clientName || !bookingState.clientPhone || !bookingState.service) {
            alert("Please fill in your name, phone number, and select a treatment.");
            return false;
        }
        return true;
    }

    function generateReference() {
        return 'ALB-' + Math.floor(1000 + Math.random() * 9000);
    }

    function buildWhatsAppMessage(branch, ref) {
        const dateOpts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const dateStr = bookingState.date.toLocaleDateString('en-ZA', dateOpts);
        const paymentLabel = PAYMENT_METHOD_LABELS[bookingState.paymentMethod] || "Not selected";

        let paymentLine = `Payment Method: ${paymentLabel}`;
        if (bookingState.paymentMethod === 'paynow') {
            paymentLine += `\nPayment Status: Payment link opened (proof to follow)`;
        } else if (bookingState.paymentMethod === 'eft') {
            paymentLine += `\nPayment Status: EFT - proof of payment to follow`;
        } else if (bookingState.paymentMethod === 'cash') {
            paymentLine += `\nPayment Status: Cash on arrival`;
        }

        return `ALABASTER BOOKING REQUEST

Reference: ${ref}
Branch: ${branch.short}
Practitioner: Dr Randy Mudau
Date: ${dateStr}
Time: ${bookingState.time}
Treatment: ${bookingState.service}
Client: ${bookingState.clientName}
Phone: ${bookingState.clientPhone}

Booking Fee: R${BOOKING_FEE}
${paymentLine}

Notes: ${bookingState.notes || 'None'}

Please confirm this slot and reply to the client on WhatsApp.`;
    }

    function sendEmailNotification(branch, ref) {
        if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes("YOUR_FORMSPREE_ID")) {
            console.warn("Formspree endpoint not configured. Email notification skipped.");
            return;
        }

        const dateOpts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const dateStr = bookingState.date.toLocaleDateString('en-ZA', dateOpts);

        const payload = {
            reference: ref,
            branch: branch.name,
            branch_phone: branch.phone,
            branch_whatsapp: branch.whatsappDisplay,
            practitioner: "Dr Randy Mudau",
            date: dateStr,
            time: bookingState.time,
            treatment: bookingState.service,
            client_name: bookingState.clientName,
            client_phone: bookingState.clientPhone,
            booking_fee: "R" + BOOKING_FEE,
            payment_method: PAYMENT_METHOD_LABELS[bookingState.paymentMethod] || "Not selected",
            notes: bookingState.notes || "None",
            submitted_at: new Date().toLocaleString('en-ZA')
        };

        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (res.ok) console.log("Booking email sent successfully.");
                else console.warn("Formspree returned an error:", res.status);
            })
            .catch(err => console.warn("Formspree network error:", err));
    }

    function showConfirmModal(branch, ref) {
        const dateOpts = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };

        setText('confirmRef', ref);
        setText('confirmBranch', branch.name);
        setText('confirmDateTime',
            `${bookingState.date.toLocaleDateString('en-ZA', dateOpts)} at ${bookingState.time}`);
        setText('confirmPayment', PAYMENT_METHOD_LABELS[bookingState.paymentMethod] || "-");

        const waMsg = buildWhatsAppMessage(branch, ref);
        const waBtn = document.getElementById('confirmWhatsAppBtn');
        if (waBtn) {
            waBtn.href = `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(waMsg)}`;
        }

        const modal = document.getElementById('confirmModal');
        if (modal) modal.style.display = 'flex';
    }

    window.closeConfirmModal = function () {
        const modal = document.getElementById('confirmModal');
        if (modal) modal.style.display = 'none';

        // Clear the form for the next booking
        resetBookingForm();
    };

    function resetBookingForm() {
        // 1. Reset state
        bookingState.branch = null;
        bookingState.date = null;
        bookingState.time = null;
        bookingState.service = null;
        bookingState.clientName = "";
        bookingState.clientPhone = "";
        bookingState.notes = "";
        bookingState.selectedDay = null;
        bookingState.reference = null;
        bookingState.paymentMethod = null;
        bookingState.currentMonth = new Date().getMonth();
        bookingState.currentYear = new Date().getFullYear();

        // 2. Deselect branch cards
        document.querySelectorAll('.booking-location-card').forEach(c => c.classList.remove('selected'));

        // 3. Clear calendar grid + reset month label
        const grid = document.getElementById('calendarGrid');
        if (grid) grid.innerHTML = '';
        const monthLabel = document.getElementById('calMonthYear');
        if (monthLabel) {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            monthLabel.textContent = `${monthNames[bookingState.currentMonth]} ${bookingState.currentYear}`;
        }

        // 4. Clear time slots
        ['morningSlots', 'afternoonSlots', 'eveningSlots'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = '';
        });
        const slotDateLabel = document.getElementById('slotDateLabel');
        if (slotDateLabel) slotDateLabel.textContent = '-';

        // 5. Clear client details
        const nameEl = document.getElementById('clientName');
        const phoneEl = document.getElementById('clientPhone');
        const notesEl = document.getElementById('clientNotes');
        const serviceEl = document.getElementById('bookingServiceSelect');
        if (nameEl) nameEl.value = '';
        if (phoneEl) phoneEl.value = '';
        if (notesEl) notesEl.value = '';
        if (serviceEl) serviceEl.selectedIndex = 0;

        // 6. Clear payment method selection
        document.querySelectorAll('.payment-method-option').forEach(opt => opt.classList.remove('active'));

        // 7. Reset EFT reference
        const eftRef = document.getElementById('eftReference');
        if (eftRef) eftRef.textContent = 'ALB-0000';

        // 8. Clear summary fields
        ['sumBranch', 'sumDate', 'sumTime', 'sumService', 'sumClient', 'sumPhone'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '-';
        });

        // 9. Hide steps 2, 3, 4
        const dateSection = document.getElementById('datetimeSection');
        const detailSection = document.getElementById('detailsSection');
        const paySection = document.getElementById('paymentSection');
        const tsCard = document.getElementById('timeslotsCard');
        if (dateSection) dateSection.style.display = 'none';
        if (detailSection) detailSection.style.display = 'none';
        if (paySection) paySection.style.display = 'none';
        if (tsCard) tsCard.style.display = 'none';

        // 10. Reset stepper to Step 1
        updateStepper(1);

        // 11. Clear URL query/hash
        if (window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname);
        }

        // 12. Scroll back to top of booking flow
        setTimeout(() => {
            const section = document.getElementById('locationSection');
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }

    // Expose so a "Book Another" button could call it directly
    window.resetBookingForm = resetBookingForm;

    function updateStepper(activeStep) {
        for (let i = 1; i <= 4; i++) {
            const pill = document.getElementById(`pillStep${i}`);
            if (!pill) continue;
            pill.classList.remove('active', 'completed');
            if (i < activeStep) pill.classList.add('completed');
            if (i === activeStep) pill.classList.add('active');
        }
    }

    /* ============================================================
       6. LEAFLET INTERACTIVE MAP
       ============================================================ */
    const mapEl = document.getElementById('alabasterBranchesMap');
    if (mapEl && typeof L !== 'undefined') {
        initAlabasterMap();
    }

    function initAlabasterMap() {
        const BRANCH_COORDS = {
            bedfordview: [-26.1814, 28.1288],
            benoni: [-26.1872, 28.3181],
            pretoria: [-25.7854, 28.2794],
            polokwane: [-23.9045, 29.4689]
        };

        const map = L.map('alabasterBranchesMap', {
            scrollWheelZoom: false,
            zoomControl: true
        }).setView([-25.5, 28.5], 7);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const markers = {};

        Object.keys(BRANCHES).forEach(key => {
            const branch = BRANCHES[key];
            const coords = BRANCH_COORDS[key];
            if (!coords) return;

            const icon = L.divIcon({
                className: 'custom-leaflet-marker-wrap',
                html: `
                    <div class="custom-map-pin">
                        <div class="pin-pulse"></div>
                        <div class="pin-body"><i class="fas fa-map-marker-alt"></i></div>
                        <div class="pin-tip"></div>
                        <div class="pin-tag-label">${branch.short}</div>
                    </div>
                `,
                iconSize: [38, 60],
                iconAnchor: [19, 55],
                popupAnchor: [0, -55]
            });

            const popupHtml = `
                <div class="branch-map-popup">
                    <span class="popup-badge">Alabaster Clinic</span>
                    <h3 class="popup-title">${branch.name}</h3>
                    <p class="popup-address">${branch.address}</p>
                    <div class="popup-info-row">
                        <span><i class="fas fa-phone-alt gold"></i> <a href="tel:${branch.phone.replace(/\s/g, '')}">${branch.phone}</a></span>
                        <span><i class="fab fa-whatsapp" style="color:#25d366;"></i> <a href="https://wa.me/${branch.whatsapp}" target="_blank">${branch.whatsappDisplay}</a></span>
                    </div>
                    <div class="popup-actions">
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.address)}" target="_blank" rel="noopener" class="btn btn--gold popup-btn-nav">
                            <i class="fas fa-location-arrow"></i> Take Me There
                        </a>
                        <a href="Bookings.html?branch=${key}" class="btn btn--whatsapp popup-btn-book">
                            <i class="fas fa-calendar-check"></i> Book A Slot
                        </a>
                    </div>
                </div>
            `;

            const marker = L.marker(coords, { icon }).addTo(map).bindPopup(popupHtml, {
                className: 'alabaster-custom-leaflet-popup',
                maxWidth: 280
            });

            markers[key] = marker;
        });

        window.viewAllBranchesOnMap = function () {
            document.querySelectorAll('.map-branch-btn').forEach(b => b.classList.remove('active'));
            const allBtn = document.querySelector('.map-branch-btn[data-branch="all"]');
            if (allBtn) allBtn.classList.add('active');

            const group = L.featureGroup(Object.values(markers));
            map.fitBounds(group.getBounds().pad(0.15));
        };

        window.focusBranchOnMap = function (branchKey) {
            if (!markers[branchKey]) return;

            document.querySelectorAll('.map-branch-btn').forEach(b => b.classList.remove('active'));
            const btn = document.querySelector(`.map-branch-btn[data-branch="${branchKey}"]`);
            if (btn) btn.classList.add('active');

            const marker = markers[branchKey];
            map.setView(marker.getLatLng(), 14, { animate: true });
            setTimeout(() => marker.openPopup(), 400);

            const mapWrap = document.getElementById('mapSection');
            if (mapWrap) mapWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        setTimeout(() => {
            const group = L.featureGroup(Object.values(markers));
            map.fitBounds(group.getBounds().pad(0.15));
        }, 400);
    }

})();