"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tag, Search, Filter, ArrowRight, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BlogCard } from "@/components/blog-card"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n/context"
import { useBlogPosts, useBlogConfig, useBlogCategories } from "@/hooks/useSanityData"

const categoryLabels: { [key: string]: string } = {
  operacoes: "Operações",
  expansao: "Expansão",
  sustentabilidade: "Sustentabilidade",
  infraestrutura: "Infraestrutura",
  qualidade: "Qualidade",
  educacao: "Educação",
  tecnologia: "Tecnologia",
  noticias: "Notícias",
}

export default function BlogPage() {
  const { t } = useI18n()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const { data: config } = useBlogConfig()
  const { data: categories } = useBlogCategories()
  const postsPerPage = config?.postsPerPage || 12

  const { data: posts = [], isLoading, error } = useBlogPosts({
    limit: postsPerPage * currentPage,
    category: selectedCategory,
  })

  // Filtrar posts por busca (client-side)
  const filteredPosts = posts.filter((post) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      post.title?.toLowerCase().includes(query) ||
      post.excerpt?.toLowerCase().includes(query) ||
      post.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    )
  })

  // Paginação
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = filteredPosts.slice(0, currentPage * postsPerPage)

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16 px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar posts</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()} className="bg-green-600 hover:bg-green-700">
            Tentar novamente
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
              <Tag className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Blog e Notícias</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-6">
              {typeof config?.title === 'string' ? config.title : (t("blogTitle") || "Blog")}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {typeof config?.description === 'string' ? config.description : (t("blogDescription") || "Acompanhe as últimas notícias e atualizações do Porto Itapoá")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="py-12 px-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-emerald-50 via-white to-white border-l-4 border-emerald-500 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder={t("searchPosts") || "Buscar posts..."}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="pl-10 rounded-full border-gray-200 focus:border-green-500"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 items-center">
                  <Filter className="h-5 w-5 text-gray-500 mr-2" />
                  <Button
                    variant={selectedCategory ? "outline" : "default"}
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(undefined)
                      setCurrentPage(1)
                    }}
                    className={selectedCategory ? "rounded-full" : "bg-green-600 text-white hover:bg-green-700 rounded-full"}
                  >
                    {t("allCategories") || "Todas"}
                  </Button>
                  {categories?.map((cat) => (
                    <Button
                      key={cat.category}
                      variant={selectedCategory === cat.category ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(cat.category)
                        setCurrentPage(1)
                      }}
                      className={
                        selectedCategory === cat.category
                          ? "bg-green-600 text-white hover:bg-green-700 rounded-full"
                          : "rounded-full"
                      }
                    >
                      {categoryLabels[cat.category] || cat.category} ({cat.count})
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-20 px-8 bg-zinc-200 border-gray-200 border-t">
        <div className="max-w-7xl mx-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                <p className="text-gray-600">{t("loading") || "Carregando..."}</p>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          {!isLoading && (
            <>
              {paginatedPosts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl max-w-md mx-auto">
                    <CardContent className="p-12">
                      <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        {t("noPostsFound") || "Nenhum post encontrado"}
                      </h3>
                      <p className="text-gray-600">
                        {t("tryDifferentSearch") || "Tente uma busca diferente ou remova os filtros"}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {paginatedPosts.map((post, index) => (
                      <BlogCard key={post._id} post={post} index={index} />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {currentPage < totalPages && (
                    <div className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={() => setCurrentPage((prev) => prev + 1)}
                          className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg font-medium shadow-xl"
                        >
                          {t("loadMore") || "Carregar mais"}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
