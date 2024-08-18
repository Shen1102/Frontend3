document.addEventListener("DOMContentLoaded", function() {

    initializePage();

    document.getElementById("saveProfile").addEventListener("click", saveProfileData);
    document.getElementById("saveContent").addEventListener("click", saveBookmarkData);
    document.getElementById("savePrivacySettings").addEventListener("click", savePrivacySettings);
    document.getElementById("saveNotifications").addEventListener("click", saveNotifications);
    document.getElementById("saveSecuritySettings").addEventListener("click", saveSecuritySettings);

    document.getElementById("profilePicture").addEventListener("change", previewProfileImage);
    document.getElementById('bookmarkContainer').addEventListener('click', handleBookmarkActions);
    document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar);

    setupIntersectionObserver();
});

function initializePage() {
    loadProfileData();
    loadBookmarkData();
    loadPrivacySettings();
    loadNotifications();
    loadSecuritySettings();
}

function saveProfilePicture(username, profilePictureInput) {
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageDataUrl = e.target.result;
            localStorage.setItem(`${username}_profilePicture`, imageDataUrl);
            document.getElementById("profileHeaderImage").src = imageDataUrl;
        };
        reader.readAsDataURL(profilePictureInput.files[0]);
    }
}

function saveProfileData() {
    const username = document.getElementById("username").value;
    const profilePictureInput = document.getElementById("profilePicture");
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    localStorage.setItem("currentUser", username);
    saveProfilePicture(username, profilePictureInput);
    localStorage.setItem(`${username}_email`, email);
    localStorage.setItem(`${username}_phone`, phone);

    alert("Profile information saved!");
}

function saveBookmarkData() {
    const username = localStorage.getItem("currentUser");
    const bookmarkInputs = document.querySelectorAll('#bookmarkContainer .form-control');
    const bookmarks = Array.from(bookmarkInputs).map(input => input.value).filter(value => value.trim() !== '');

    localStorage.setItem(`${username}_savedArticles`, bookmarks.join('|'));
    alert("Bookmark contents saved!");
}

function savePrivacySettings() {
    const username = localStorage.getItem("currentUser");
    const profileVisibility = document.getElementById("profileVisibility").value;
    const contentSharing = document.getElementById("contentSharing").value;

    localStorage.setItem(`${username}_profileVisibility`, profileVisibility);
    localStorage.setItem(`${username}_contentSharing`, contentSharing);

    alert("Privacy settings saved!");
}

function saveNotifications() {
    const username = localStorage.getItem("currentUser");
    const newsletterPreferences = document.getElementById("newsletterPreferences").value;

    localStorage.setItem(`${username}_newsletterPreferences`, newsletterPreferences);

    alert("Notifications settings saved!");
}

function saveSecuritySettings() {
    const username = localStorage.getItem("currentUser");
    const passwordFirst = document.getElementById("passwordFirst").value;
    const passwordSecond = document.getElementById("passwordSecond").value;

    if (passwordFirst != passwordSecond) {
        alert("Passwords do not match!");
        return;
    }

    localStorage.setItem(`${username}_password`, passwordFirst);
    alert("Account security settings saved!");
}

function loadProfileData() {
    const username = localStorage.getItem("currentUser");
    if (username) {
        document.getElementById("username").value = username;
        document.getElementById("profileUsername").textContent = username;
        document.getElementById("email").value = localStorage.getItem(`${username}_email`) || "";
        document.getElementById("phone").value = localStorage.getItem(`${username}_phone`) || "";

        const savedImage = localStorage.getItem(`${username}_profilePicture`);
        const profileHeaderImage = document.getElementById("profileHeaderImage");

        if (savedImage) {
            profileHeaderImage.src = savedImage;
        } else {
            // Set to default image if no profile picture is found in localStorage
            profileHeaderImage.src = "/images/default-profile.png";
        }
    } else {
        // If no user is logged in, also set the default image
        document.getElementById("profileHeaderImage").src = "/images/default-profile.png";
    }
}


function loadBookmarkData() {
    const username = localStorage.getItem("currentUser");
    if (username) {
        const savedBookmarks = localStorage.getItem(`${username}_savedArticles`);
        if (savedBookmarks) {
            const bookmarkContainer = document.getElementById('bookmarkContainer');
            bookmarkContainer.innerHTML = '';
            
            const bookmarks = savedBookmarks.split('|');
            bookmarks.forEach((bookmark, index) => {
                addBookmark(bookmark, index + 1);
            });
        }
    }
}

function loadPrivacySettings() {
    const username = localStorage.getItem("currentUser");
    if (username) {
        document.getElementById("profileVisibility").value = localStorage.getItem(`${username}_profileVisibility`) || "Public";
        document.getElementById("contentSharing").value = localStorage.getItem(`${username}_contentSharing`) || "Everyone";
    }
}

function loadNotifications() {
    const username = localStorage.getItem("currentUser");
    if (username) {
        document.getElementById("newsletterPreferences").value = localStorage.getItem(`${username}_newsletterPreferences`) || "Once a week";
    }
}

function loadSecuritySettings() {
    const username = localStorage.getItem("currentUser");
    if (username) {
        const password = localStorage.getItem(`${username}_password`) || "";
        document.getElementById("passwordFirst").value = password;
        document.getElementById("passwordSecond").value = password;
    }
}

function previewProfileImage() {
    const profilePictureInput = document.getElementById("profilePicture");
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profileHeaderImage").src = e.target.result;
        };
        reader.readAsDataURL(profilePictureInput.files[0]);
    }
}

function setupIntersectionObserver() {
    const sections = document.querySelectorAll(".container");
    const options = { threshold: 0.5 };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, options);
    sections.forEach(section => observer.observe(section));
}

function handleBookmarkActions(event) {
    if (event.target.classList.contains('btn-add')) {
        addBookmark();
    } else if (event.target.classList.contains('btn-remove')) {
        removeBookmark(event);
    }
}

function addBookmark(link = '', index = null) {
    const bookmarkContainer = document.getElementById('bookmarkContainer');
    const bookmarkIndex = index || document.querySelectorAll('.bookmark-group').length + 1;

    const newBookmarkGroup = document.createElement('div');
    newBookmarkGroup.className = 'form-group bookmark-group';
    newBookmarkGroup.innerHTML = `
        <div class="input-group">
            <label for="savedArticles${bookmarkIndex}">Saved Article</label>
            <input type="text" class="form-control" id="savedArticles${bookmarkIndex}" placeholder="Enter article link" value="${link}">
            <div class="input-group-append">
                <button type="button" class="btn-add" title="Add another link">+</button>
                <button type="button" class="btn-remove" title="Remove this link">−</button>
            </div>
        </div>
    `;
    bookmarkContainer.appendChild(newBookmarkGroup);
    updateRemoveButtons();
}

function removeBookmark(event) {
    const bookmarkGroup = event.target.closest('.bookmark-group');
    if (bookmarkGroup) {
        const bookmarkGroups = document.querySelectorAll('.bookmark-group');
        if (bookmarkGroups.length > 1) {
            bookmarkGroup.remove();
        } else {
            bookmarkGroup.querySelector('input').value = '';
        }
        saveBookmarks();
        updateRemoveButtons();
    }
}

function updateRemoveButtons() {
    document.querySelectorAll('.btn-remove').forEach(button => button.classList.remove('disabled'));
}

function saveBookmarks() {
    const bookmarks = Array.from(document.querySelectorAll('.bookmark-group input')).map(input => input.value);
    localStorage.setItem('bookmarks', bookmarks.join('|'));
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
}