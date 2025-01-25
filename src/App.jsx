import React, { useState } from 'react'
    import './index.css'

    const App = () => {
      const [items, setItems] = useState([])
      const [newItem, setNewItem] = useState('')
      const [quantity, setQuantity] = useState(1)
      const [price, setPrice] = useState(0)

      const addItem = (e) => {
        e.preventDefault()
        if (newItem.trim() === '') return
        setItems([...items, {
          id: Date.now(),
          text: newItem,
          quantity: quantity,
          price: price,
          completed: false
        }])
        setNewItem('')
        setQuantity(1)
        setPrice(0)
      }

      const toggleCompleted = (id) => {
        setItems(items.map(item => 
          item.id === id ? { ...item, completed: !item.completed } : item
        ))
      }

      const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id))
      }

      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      const sendWhatsApp = () => {
        const phoneNumber = '+14155238886'
        const listContent = items
          .map(item => `• ${item.text} - ${item.quantity}x ${item.price.toFixed(2)}€`)
          .join('\n')
        
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        
        const message = encodeURIComponent(
          `📝 Liste de courses :\n\n${listContent}\n\n💶 Total : ${total.toFixed(2)}€`
        )

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
        window.open(whatsappUrl, '_blank')
      }

      return (
        <div className="app-container">
          <header className="app-header">
            <h1>Gestionnaire de Courses</h1>
            <p>Organisez vos achats efficacement</p>
          </header>

          <div className="main-content">
            <form onSubmit={addItem} className="add-item-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Article</label>
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Nom de l'article"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantité</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Prix unitaire (€)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <button type="submit" className="add-button">
                  <span>+</span> Ajouter
                </button>
              </div>
            </form>

            <div className="items-list">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className={`item-card ${item.completed ? 'completed' : ''}`}
                >
                  <div className="item-info">
                    <h3>{item.text}</h3>
                    <div className="item-details">
                      <span>{item.quantity}x</span>
                      <span>{item.price.toFixed(2)}€</span>
                      <span className="total-price">
                        {(item.quantity * item.price).toFixed(2)}€
                      </span>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button 
                      onClick={() => toggleCompleted(item.id)}
                      className={`status-button ${item.completed ? 'checked' : ''}`}
                    >
                      {item.completed ? '✓' : ''}
                    </button>
                    <button 
                      onClick={() => deleteItem(item.id)}
                      className="delete-button"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary">
              <div className="total-amount">
                <span>Total :</span>
                <span className="amount">{total.toFixed(2)}€</span>
              </div>
              <button 
                onClick={sendWhatsApp}
                className="whatsapp-button"
                disabled={items.length === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17.5 6.5a6.5 6.5 0 0 0-11.3 4.4 6.5 6.5 0 0 0 .6 3.8L6 20l5.3-1.4a6.5 6.5 0 0 0 6.2-4.5 6.5 6.5 0 0 0-4-7.6zm-1.1 6.4c-.2.6-1.3 1.2-1.9 1.3-.5.1-1.1.2-2.6-.8-1.5-1-2.5-3.3-2.6-3.5-.1-.2-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.8.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.9.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.4-.6.6-.2.2-.4.4-.3.7.1.3.6 1.3 1.3 2.1.9.9 1.7 1.2 2 1.3.3.1.5.1.7-.1.2-.2.5-.6.7-.8.2-.2.5-.4.7-.3.2.1.4.2.6.3.2.1.4.3.5.5.1.2.1.5-.1.8z"/>
                </svg>
                Envoyer par WhatsApp
              </button>
            </div>
          </div>
        </div>
      )
    }

    export default App
