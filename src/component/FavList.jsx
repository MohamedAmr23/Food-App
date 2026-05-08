import React, { Fragment, useEffect, useState } from 'react'
import HeaderCard from '../sharedComponent/HeaderCard'
import headerRecipe from '../assets/header-recipe.png'
import { favApi } from '../api'
import NoData from './NoData'
import { toast } from 'react-toastify'

const FavList = () => {
  const [favList, setFavList] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

const getFavList = async () => {
  try {
    setLoading(true)
    const response = await favApi.getAllFavs()
    console.log('FAV RESPONSE:', response.data)
    console.log('FIRST ITEM:', response.data.data[0]) // 👈 add this
    setFavList(response.data.data)
  } catch (error) {
    console.error('Error fetching favorites:', error)
  } finally {
    setLoading(false)
  }
}

  const deleteFav = async (id) => {
    if (!window.confirm('Remove this recipe from your favorites?')) return
    try {
      setDeletingId(id)
      await favApi.deleteFav(id)
      setFavList(prev => prev.filter(fav => fav.id !== id))
      toast.success('Recipe removed from favorites')
    } catch (error) {
      console.error('Error deleting favorite:', error)
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    getFavList()
  }, [])

  const filtered = favList.filter(fav =>
    !searchTerm ||
    fav.recipe?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fav.recipe?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    })
  }

  return (
    <Fragment>
      <HeaderCard
        title={'Favourites'}
        subtitle={'Item'}
        describtion1={'You can now add your favourite recipes that you love '}
        describtion2={'it from the Application and you can edit'}
        image={headerRecipe}
      />

      <div className='px-5 py-3 d-flex justify-content-between align-items-center'>
        <div>
          <h4>Favourites Table Details</h4>
          <p>You can check all details</p>
        </div>

        {/* Search */}
        <div
          className="d-flex align-items-center"
          style={{
            background: '#fff',
            border: '1px solid #dee2e6',
            borderRadius: 8,
            padding: '7px 14px',
            width: 260,
          }}
        >
          <i className="fa fa-search text-muted me-2" style={{ fontSize: 13 }}></i>
          <input
            type="text"
            placeholder="Search favourites..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.875rem' }}
          />
        </div>
      </div>

      <div className='px-5 py-3'>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-success me-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="text-muted">Loading favourites...</span>
          </div>
        ) : filtered.length > 0 ? (
          <>
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Recipe Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Tag</th>
                  <th scope="col">Category</th>
                  <th scope="col">Added On</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((fav, index) => (
                  <tr key={fav.id}>
                    <th scope="row" className="text-muted" style={{ fontSize: '0.85rem' }}>
                      {index + 1}
                    </th>

                    {/* Image */}
                    <td>
                      {fav.recipe?.imagePath ? (
                        <img
                          src={`https://upskilling-egypt.com:3006/${fav.recipe.imagePath}`}
                          alt={fav.recipe?.name}
                          style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', border: '1px solid #dee2e6' }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 44, height: 44, borderRadius: 8,
                            background: '#f1f3f5',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <i className="fa fa-image text-muted"></i>
                        </div>
                      )}
                    </td>

                    {/* Name */}
                    <td style={{ fontWeight: 500 }}>{fav.recipe?.name || '—'}</td>

                    {/* Price */}
                    <td>
                      <span className="badge bg-success bg-opacity-10 text-success" style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                        ${fav.recipe?.price ?? '—'}
                      </span>
                    </td>

                    {/* Description */}
                    <td
                      className="text-muted"
                      style={{
                        maxWidth: 180, fontSize: '0.85rem',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                      }}
                    >
                      {fav.recipe?.description || '—'}
                    </td>

                    {/* Tag */}
                    <td>
                      {fav.recipe?.tag?.name ? (
                        <span className="badge rounded-pill bg-warning bg-opacity-15 text-warning-emphasis" style={{ fontSize: '0.78rem' }}>
                          {fav.recipe.tag.name}
                        </span>
                      ) : '—'}
                    </td>

                    {/* Category */}
                    <td style={{ fontSize: '0.85rem' }}>
                      {fav.recipe?.category?.length > 0
                        ? fav.recipe.category.map(c => (
                          <span key={c.id} className="badge bg-secondary bg-opacity-10 text-secondary me-1" style={{ fontSize: '0.78rem' }}>
                            {c.name}
                          </span>
                        ))
                        : '—'
                      }
                    </td>

                    {/* Added On */}
                    <td className="text-muted" style={{ fontSize: '0.85rem' }}>
                      {formatDate(fav.creationDate)}
                    </td>

                    {/* Actions */}
                    <td>
                      {deletingId === fav.id ? (
                        <div className="spinner-border spinner-border-sm text-danger" role="status">
                          <span className="visually-hidden">Deleting...</span>
                        </div>
                      ) : (
                        <i
                          className='fa fa-heart-broken text-danger'
                          title="Remove from favourites"
                          style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                          onClick={() => deleteFav(fav.id)}
                        ></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-muted" style={{ fontSize: '0.8rem' }}>
              Showing {filtered.length} of {favList.length} favourites
            </p>
          </>
        ) : (
          <NoData />
        )}
      </div>
    </Fragment>
  )
}

export default FavList