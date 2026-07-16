import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import EditorPage from './pages/EditorPage'
import LandingPage from './pages/LandingPage'
import LibraryPage from './pages/LibraryPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SharePage from './pages/SharePage'
import SnippetDetailPage from './pages/SnippetDetailPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/s/:shareId" element={<SharePage />} />
              <Route
                path="/library"
                element={
                  <ProtectedRoute>
                    <LibraryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/new"
                element={
                  <ProtectedRoute>
                    <EditorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/snippets/:id"
                element={
                  <ProtectedRoute>
                    <SnippetDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <footer className="mx-auto max-w-6xl px-4 py-10 text-center text-xs text-[var(--color-muted)]">
            SnippetVault · Code Snippet Manager with Syntax Highlight · Issue #196
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
