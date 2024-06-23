document.addEventListener("DOMContentLoaded", () => {
  const itemForm = document.getElementById("item-form");
  const itemsList = document.getElementById("items-list");

  const fetchItems = async () => {
    const response = await fetch("/items");
    const items = await response.json();
    itemsList.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
                ${item.name} - ${item.description} - Quantity: ${item.quantity}
                <button onclick="editItem('${item._id}', '${item.name}', '${item.description}', ${item.quantity})">Edit</button>
                <button onclick="deleteItem('${item._id}')">Delete</button>
            `;
      itemsList.appendChild(li);
    });
  };

  itemForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const quantity = document.getElementById("quantity").value;
    await fetch("/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, quantity }),
    });
    fetchItems();
    itemForm.reset();
  });

  window.editItem = async (id, name, description, quantity) => {
    document.getElementById("name").value = name;
    document.getElementById("description").value = description;
    document.getElementById("quantity").value = quantity;
    itemForm.onsubmit = async (e) => {
      e.preventDefault();
      await fetch(`/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: document.getElementById("name").value,
          description: document.getElementById("description").value,
          quantity: document.getElementById("quantity").value,
        }),
      });
      fetchItems();
      itemForm.reset();
      itemForm.onsubmit = addNewItem;
    };
  };

  window.deleteItem = async (id) => {
    await fetch(`/items/${id}`, {
      method: "DELETE",
    });
    fetchItems();
  };

  fetchItems();
});
