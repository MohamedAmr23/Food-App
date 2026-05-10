import React, { Fragment, useEffect, useState } from 'react'
import HeaderCard from '../sharedComponent/HeaderCard'
import headerRecipe from '../assets/header-recipe.png'
import { favApi } from '../api'
import { toast } from 'react-toastify'
import DeleteConfirmation from '../sharedComponent/DeleteConfirmation'

const BASE_URL = 'https://upskilling-egypt.com:3006'

const FavList = () => {
  const [favList, setFavList] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFav, setSelectedFav] = useState(null)

  const getFavList = async () => {
    try {
      setLoading(true)
      const response = await favApi.getAllFavs()
      setFavList(response.data.data)
    } catch (error) {
      console.error('Error fetching favorites:', error)
      toast.error('Failed to fetch favourites')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      await favApi.deleteFav(selectedFav.id)
      setFavList(prev => prev.filter(fav => fav.id !== selectedFav.id))
      toast.success('Recipe removed from favourites')
      setSelectedFav(null)
    } catch (error) {
      console.error('Error deleting favorite:', error)
      toast.error('Failed to remove from favourites')
    }
  }

  useEffect(() => { getFavList() }, [])

  const filtered = favList.filter(fav =>
    !searchTerm ||
    fav.recipe?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fav.recipe?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const avgPrice = favList.length
    ? Math.round(favList.reduce((sum, f) => sum + (f.recipe?.price || 0), 0) / favList.length)
    : 0

  const uniqueCategories = new Set(
    favList.flatMap(f => f.recipe?.category?.map(c => c.id) || [])
  ).size

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
        subtitle={'My List'}
        describtion1={'Your favourite recipes are saved here,'}
        describtion2={'you can remove any item you no longer love'}
        image={headerRecipe}
      />

      <div className="container-fluid px-5 py-4">

        {/* ── Header ── */}
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom flex-wrap gap-3">
          <div>
            <h2 className="fw-bold mb-1 fs-3">My Favourites</h2>
            <p className="text-muted mb-0 small">Recipes you love — all in one place</p>
          </div>

          {/* Search */}
          <div className="input-group" style={{ maxWidth: 280 }}>
            <span className="input-group-text bg-light border-end-0">
              <i className="fa fa-search text-muted small"></i>
            </span>
            <input
              type="text"
              placeholder="Search favourites..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="form-control border-start-0 ps-0"
            />
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 bg-danger bg-opacity-10 p-3">
                  <i className="fa fa-heart text-danger fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>
                    Saved Recipes
                  </p>
                  <h3 className="fw-bold mb-0 text-danger">{favList.length}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 bg-warning bg-opacity-10 p-3">
                  <i className="fa fa-dollar-sign text-warning fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>
                    Avg. Price
                  </p>
                  <h3 className="fw-bold mb-0 text-warning">${avgPrice}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 bg-primary bg-opacity-10 p-3">
                  <i className="fa fa-tags text-primary fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>
                    Categories
                  </p>
                  <h3 className="fw-bold mb-0 text-primary">{uniqueCategories}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger mb-3"></div>
            <p className="text-muted small">Loading your favourites...</p>
          </div>

        ) : filtered.length > 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center py-3">
              <div>
                <h5 className="fw-bold mb-0">Favourites Table</h5>
                <p className="text-muted small mb-0">
                  Showing {filtered.length} of {favList.length} favourites
                </p>
              </div>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4 text-muted small fw-semibold text-uppercase py-3">#</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Image</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Recipe Name</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Price</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Description</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Tag</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Category</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Added On</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((fav, index) => (
                      <tr key={fav.id}>

                        {/* # */}
                        <td className="ps-4 text-muted small fw-bold">
                          {String(index + 1).padStart(3, '0')}
                        </td>

                        {/* Image */}
                        <td>
                          {fav.recipe?.imagePath
                            ? <img
                                src={`${BASE_URL}/${fav.recipe.imagePath}`}
                                alt={fav.recipe?.name}
                                className="rounded-3 object-fit-cover"
                                style={{ width: 45, height: 45 }}
                              />
                            : <div
                                className="rounded-3 bg-light border d-flex align-items-center justify-content-center"
                                style={{ width: 45, height: 45 }}
                              >
                                <i className="fa fa-image text-muted"></i>
                              </div>
                          }
                        </td>

                        {/* Name */}
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="rounded-circle bg-danger bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{ width: 32, height: 32 }}
                            >
                              <i className="fa fa-heart text-danger" style={{ fontSize: 11 }}></i>
                            </div>
                            <span className="fw-semibold">{fav.recipe?.name || '—'}</span>
                          </div>
                        </td>

                        {/* Price */}
                        <td>
                          <span className="badge text-success fw-semibold fs-6 bg-success bg-opacity-10 px-3 py-2 rounded-pill">
                            ${fav.recipe?.price ?? '—'}
                          </span>
                        </td>

                        {/* Description */}
                        <td
                          className="text-muted small"
                          style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                          title={fav.recipe?.description}
                        >
                          {fav.recipe?.description || '—'}
                        </td>

                        {/* Tag */}
                        <td>
                          {fav.recipe?.tag?.name
                            ? <span className="badge bg-secondary bg-opacity-10 text-secondary fw-normal px-3 py-2 rounded-pill">
                                {fav.recipe.tag.name}
                              </span>
                            : <span className="text-muted">—</span>
                          }
                        </td>

                        {/* Category */}
                        <td>
                          {fav.recipe?.category?.length > 0
                            ? fav.recipe.category.map(c => (
                                <span key={c.id} className="badge bg-primary bg-opacity-10 text-primary fw-normal px-2 py-1 rounded-pill me-1">
                                  {c.name}
                                </span>
                              ))
                            : <span className="text-muted">—</span>
                          }
                        </td>

                        {/* Added On */}
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <i className="fa fa-calendar-alt text-muted small"></i>
                            <span className="text-muted small">{formatDate(fav.creationDate)}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td>
                          <button
                            className="btn btn-sm btn-danger bg-opacity-10 border-0 rounded-3 d-flex align-items-center gap-1 px-3"
                            onClick={() => setSelectedFav(fav)}
                            title="Remove from favourites"
                          >
                            <i className="fa fa-heart-broken text-danger"></i>
                            <span className="text-danger small fw-semibold">Remove</span>
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        ) : (
          /* ── Empty State ── */
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <div
                className="rounded-circle bg-danger bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: 80, height: 80 }}
              >
                <i className="fa fa-heart text-danger fs-3"></i>
              </div>
              <h5 className="fw-bold mb-1">No Favourites Yet</h5>
              <p className="text-muted small mb-0">
                Browse recipes and click the ❤️ to save your favourites here
              </p>
            </div>
          </div>
        )}

      </div>

      {/* ── Remove Confirmation Modal ── */}
      <DeleteConfirmation
        show={!!selectedFav}
        onClose={() => setSelectedFav(null)}
        onConfirm={handleConfirmDelete}
        itemName={selectedFav?.recipe?.name}
      />
    </Fragment>
  )
}

export default FavList