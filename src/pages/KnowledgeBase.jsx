import React, { useState, useMemo, useRef, useEffect } from 'react';
import { BookOpen, Search, TrendingUp, Users, Clock, CheckCircle, Star, Calendar, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import knowledgeData from '../data/knowledge.json';
import Layout from '../layout/SidebarLayout';
import { useNavigate } from 'react-router-dom';

const KnowledgeBase = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedId, setExpandedId] = useState(null)
  const [filteredList, setFilteredList] = useState(knowledgeData)
  const faqRefs = useRef({})

  const categories = [...new Set(knowledgeData.map(faq => faq.category))]

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if(userRole !== "CUSTOMER"){
      navigate('/dashboard');
    }
  })

  const filteredFAQs = useMemo(() => {
    const list = knowledgeData.filter(faq => {
      const matchesSearch = `${faq.question} ${faq.answer}`.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    setFilteredList(list)
    return list
  }, [searchTerm, selectedCategory])

  const popularFAQs = knowledgeData
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5)

  const totalFAQs = knowledgeData.length
  const totalCategories = categories.length
  const recentlyUpdated = knowledgeData.filter(faq => {
    const updateDate = new Date(faq.lastUpdated)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return updateDate > oneWeekAgo
  }).length

  const scrollToFaq = (id) => {
    const faq = knowledgeData.find(f => f.id === id)
    if (faq) {
      setSearchTerm('')
      setSelectedCategory('All')
      setFilteredList([faq])
      setExpandedId(id)
      setTimeout(() => {
        const el = faqRefs.current[id]
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <BookOpen className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Knowledge Base</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to frequently asked questions and get the help you need
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<BookOpen className="w-6 h-6 text-blue-600" />} title="Total Articles" value={totalFAQs} color="blue" />
          <StatCard icon={<Users className="w-6 h-6 text-green-600" />} title="Categories" value={totalCategories} color="green" />
          <StatCard icon={<Clock className="w-6 h-6 text-purple-600" />} title="Updated This Week" value={recentlyUpdated} color="purple" />
          <StatCard icon={<CheckCircle className="w-6 h-6 text-emerald-600" />} title="Resolution Rate" value="94%" color="emerald" />
        </div>

        <div className="bg-white mb-8 border-l-4 border-l-orange-400 rounded-lg shadow-md">
          <div className="p-6">
            <div className="flex items-center space-x-2 text-orange-600 mb-4">
              <TrendingUp className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Most Popular Questions</h2>
            </div>
            <div className="space-y-3">
              {popularFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  onClick={() => scrollToFaq(faq.id)}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors group"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700 group-hover:text-orange-700 font-medium">
                    {faq.question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <CategoryButton label="All" selected={selectedCategory === 'All'} onClick={() => setSelectedCategory('All')} />
          {categories.map((category) => (
            <CategoryButton key={category} label={category} selected={selectedCategory === category} onClick={() => setSelectedCategory(category)} />
          ))}
        </div>

        <div className="space-y-6">
          {filteredList.length > 0 ? (
            filteredList.map((faq) => (
              <div key={faq.id} ref={(el) => (faqRefs.current[faq.id] = el)}>
                <FAQCard faq={faq} isExpanded={expandedId === faq.id} onToggle={() => setExpandedId(expandedId === faq.id ? null : faq.id)} />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No results found for "{searchTerm}"</p>
              <p className="text-gray-400 mt-2">Try adjusting your search terms or category filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
  )
}

const StatCard = ({ icon, title, value, color }) => (
  <div className={`bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow rounded-lg p-6`}>
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-full bg-${color}-100`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
      </div>
    </div>
  </div>
)

const CategoryButton = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-colors ${
      selected ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
    }`}
  >
    {label}
  </button>
)

const FAQCard = ({ faq, isExpanded, onToggle }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
      <div className="p-6 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded border border-gray-200">{faq.category}</span>
              <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(faq.difficulty)}`}>{faq.difficulty}</span>
              {faq.popularity > 80 && (
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-yellow-600 font-medium">Popular</span>
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-blue-600 group-hover:text-blue-800 transition-colors mb-2">
              {faq.question}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Updated {formatDate(faq.lastUpdated)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{faq.popularity}% helpful</span>
              </div>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            )}
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="pt-4">
            <p className="text-gray-700 leading-relaxed mb-4">{faq.answer}</p>
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {faq.tags.map((tag, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-gray-50 text-gray-700 rounded border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default KnowledgeBase
