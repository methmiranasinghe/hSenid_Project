document.addEventListener("DOMContentLoaded", () => {
  const addNewPlanBtn = document.getElementById("add-new-plan");
  const planModal = document.getElementById("plan-modal");
  const closeModal = document.querySelector(".close");
  const planForm = document.getElementById("plan-form");
  const plansSection = document.getElementById("plans-section");
  let editMode = false;
  let editElement = null;

  // Function to open the modal
  const openModal = () => {
    planModal.style.display = "block";
  };

  // Function to close the modal
  const closeModalHandler = () => {
    planModal.style.display = "none";
    planForm.reset();
    document.getElementById("modal-title").textContent = "Add New Plan";
    editMode = false;
    editElement = null;
  };

  
  addNewPlanBtn.addEventListener("click", openModal);

  
  closeModal.addEventListener("click", closeModalHandler);
const addPlanToSidebar = (planName) => {
  const newPlanItem = document.createElement("li");
  newPlanItem.innerHTML = `<a class="links" href="/">${planName}</a>`;
  sidebarMenu.querySelector("ul").appendChild(newPlanItem);
};
 
  planForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const planName = document.getElementById("plan-name").value;
    const planPrice = document.getElementById("plan-price").value;
    const planDetails = document.getElementById("plan-details").value;

    if (editMode) {
      // Edit existing plan
      editElement.querySelector(".plan-name").textContent = planName;
      editElement.querySelector(
        ".amount-due p:nth-child(2)"
      ).textContent = `$${planPrice}`;
      editElement.querySelector(".plan-details-content").textContent =
        planDetails;
    } else {
      // Add new plan
      const newPlan = document.createElement("div");
      newPlan.classList.add("plan");
      newPlan.innerHTML = `
      
        <div class="plan-info">
         <div class="plan-header">
            <h3 class="plan-name">${planName}</h3>
            <button class="edit-plan"><i class="fas fa-edit"></i></button>
            <button class="delete-plan" ><i class="fas fa-trash-alt"></i></button>
        </div>

          <img src="images/microsoft-logo.png" alt="Microsoft"><br><br>
          <input type="radio" name="plan" class="plan-radio">
           <label for="age2">Popular business plan  / 3m</label><p>(Minimum subscription 1200 INR)</p><br>
          <p class="plan-details-content">${planDetails}</p>
        <div class="details">
          <div class="features-rectangle">
            <div class="features">
              <p>5 team members ($12 / 3 months each)</p>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </div>

          <div class="billing-details-1">
            <p>Status: <br>Active</p>
            <p>Billing cycle:<br> Yearly</p>
          </div>
          
          <div class="billing-details-2">
            <p class="text">Last invoice date: <br>Oct 20, 2021</p>
            <p>Next payment date:<br> Oct 20, 2023</p>
          </div>

        </div>
        
          <button class="unsubscribe-btn">Unsubscribe</button>
          <button class="change-package-btn">Change Package</button>
        </div>
          <div class="plan-details">

          <h4 class="plan-type">Membership Plan: Turbo Business Plan / 3m</h4>
          <div class="amount-due">
            <p>Amount due</p>
            <p>$${planPrice}.00</p>
            <p>10% Off - Coupon</p>
            <input type="text" placeholder="Enter code">
            <p>Total to Pay: $${planPrice - planPrice * 0.1}.00</p>
            <button>Add to cart</button>
          </div>
      `;
      
      plansSection.appendChild(newPlan);
      
    }

    closeModalHandler();
  });

  // Insert modal HTML into the DOM
  document.body.insertAdjacentHTML(
    "beforeend",
    `
  <div id="deleteModal" class="modal">
    <div class="modal-content">
      <p>Are you sure you wish to delete your plan?</p>
      <button class="delete-btn" id="confirmDelete">Confirm</button>
      <button class="cancel-btn" id="cancelDelete">Cancel</button>
    </div>
  </div>
`
  );
  // Function to handle edit and delete button clicks
  const planClickHandler = (e) => {
    if (e.target.classList.contains("edit-plan")) {
      editMode = true;
      editElement = e.target.closest(".plan");
      openModal();
      document.getElementById("modal-title").textContent = "Edit Plan";
      document.getElementById("plan-name").value =
        editElement.querySelector(".plan-name").textContent;
      document.getElementById("plan-price").value = editElement
        .querySelector(".amount-due p:nth-child(2)")
        .textContent.slice(1);
      document.getElementById("plan-details").value = editElement.querySelector(
        ".plan-details-content"
      ).textContent;
    } else if (e.target.classList.contains("delete-plan")) {
      //e.target.closest(".plan").remove();
      // Store reference to the plan to be deleted
      const planToDelete = e.target.closest(".plan");

      // Show the modal
      document.getElementById("deleteModal").style.display = "block";

      // Handle confirm delete
      document.getElementById("confirmDelete").onclick = function () {
        planToDelete.remove();
        document.getElementById("deleteModal").style.display = "none";
      };

      // Handle cancel delete
      document.getElementById("cancelDelete").onclick = function () {
        document.getElementById("deleteModal").style.display = "none";
      };
    }
  };

  // Event listener for edit and delete buttons
  plansSection.addEventListener("click", planClickHandler);

  // Event listener to close the modal when clicking outside of it
  window.addEventListener("click", (e) => {
    if (e.target == planModal) {
      closeModalHandler();
    }
  });
});

//
document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const userProfileImg = document.getElementById("userProfileImg");
  const profileModal = document.getElementById("profile-modal");
  const closeButtons = document.querySelectorAll(".modal .close");

  // Dark mode toggle
  darkModeToggle.addEventListener("change", function () {
    if (darkModeToggle.checked) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  });

  // Open profile modal
  userProfileImg.addEventListener("click", function () {
    profileModal.style.display = "block";
  });

  // Close modals
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.closest(".modal").style.display = "none";
    });
  });

  // Close modals when clicking outside of the modal content
  window.addEventListener("click", function (event) {
    if (event.target === profileModal) {
      profileModal.style.display = "none";
    }
  });
});