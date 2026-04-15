import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

// ─── Card Data (all 78 cards) ────────────────────────────────────────────────
const TAROT_CARDS = [
  // ── Major Arcana ─────────────────────────────────────────────────────────
  { name: 'The Fool',           suit: 'Major Arcana', number: 0,  upright: ['beginnings', 'innocence', 'spontaneity', 'free spirit'],           reversed: ['recklessness', 'naivety', 'inconsideration', 'holding back'] },
  { name: 'The Magician',       suit: 'Major Arcana', number: 1,  upright: ['manifestation', 'resourcefulness', 'power', 'inspired action'],    reversed: ['manipulation', 'poor planning', 'untapped talent', 'wasted potential'] },
  { name: 'The High Priestess', suit: 'Major Arcana', number: 2,  upright: ['intuition', 'sacred knowledge', 'divine feminine', 'inner voice'], reversed: ['secrets', 'disconnected intuition', 'withdrawal', 'silence'] },
  { name: 'The Empress',        suit: 'Major Arcana', number: 3,  upright: ['femininity', 'beauty', 'nature', 'nurturing', 'abundance'],         reversed: ['creative block', 'dependence', 'smothering', 'neglect'] },
  { name: 'The Emperor',        suit: 'Major Arcana', number: 4,  upright: ['authority', 'establishment', 'structure', 'fatherhood'],            reversed: ['domination', 'excessive control', 'rigidity', 'inflexibility'] },
  { name: 'The Hierophant',     suit: 'Major Arcana', number: 5,  upright: ['tradition', 'institutions', 'spiritual wisdom', 'conformity'],      reversed: ['rebellion', 'subversiveness', 'new approaches', 'challenge'] },
  { name: 'The Lovers',         suit: 'Major Arcana', number: 6,  upright: ['love', 'harmony', 'relationships', 'values', 'choices'],            reversed: ['disharmony', 'imbalance', 'misalignment', 'conflict'] },
  { name: 'The Chariot',        suit: 'Major Arcana', number: 7,  upright: ['control', 'willpower', 'victory', 'assertion', 'determination'],    reversed: ['lack of control', 'aggression', 'lack of direction', 'defeat'] },
  { name: 'Strength',           suit: 'Major Arcana', number: 8,  upright: ['strength', 'courage', 'persuasion', 'influence', 'compassion'],     reversed: ['weakness', 'self-doubt', 'lack of discipline', 'raw emotion'] },
  { name: 'The Hermit',         suit: 'Major Arcana', number: 9,  upright: ['soul searching', 'introspection', 'being alone', 'inner guidance'], reversed: ['isolation', 'loneliness', 'withdrawal', 'lost your way'] },
  { name: 'Wheel of Fortune',   suit: 'Major Arcana', number: 10, upright: ['good luck', 'karma', 'life cycles', 'destiny', 'turning point'],    reversed: ['bad luck', 'lack of control', 'clinging to control', 'resistance'] },
  { name: 'Justice',            suit: 'Major Arcana', number: 11, upright: ['justice', 'fairness', 'truth', 'cause and effect', 'law'],          reversed: ['unfairness', 'dishonesty', 'lack of accountability', 'injustice'] },
  { name: 'The Hanged Man',     suit: 'Major Arcana', number: 12, upright: ['pause', 'surrender', 'letting go', 'new perspectives'],             reversed: ['delays', 'resistance', 'stalling', 'indecision'] },
  { name: 'Death',              suit: 'Major Arcana', number: 13, upright: ['endings', 'change', 'transformation', 'transition', 'letting go'],  reversed: ['resistance to change', 'personal transformation', 'stagnation', 'fear'] },
  { name: 'Temperance',         suit: 'Major Arcana', number: 14, upright: ['balance', 'moderation', 'patience', 'purpose', 'meaning'],          reversed: ['imbalance', 'excess', 'lack of long-term vision', 'extremes'] },
  { name: 'The Devil',          suit: 'Major Arcana', number: 15, upright: ['bondage', 'addiction', 'materialism', 'playfulness', 'shadow self'], reversed: ['releasing limiting beliefs', 'detachment', 'freedom', 'reclaiming power'] },
  { name: 'The Tower',          suit: 'Major Arcana', number: 16, upright: ['sudden change', 'upheaval', 'chaos', 'revelation', 'disruption'],   reversed: ['avoiding disaster', 'fear of change', 'personal transformation', 'averted crisis'] },
  { name: 'The Star',           suit: 'Major Arcana', number: 17, upright: ['hope', 'faith', 'purpose', 'renewal', 'spirituality'],              reversed: ['lack of faith', 'despair', 'discouragement', 'insecurity'] },
  { name: 'The Moon',           suit: 'Major Arcana', number: 18, upright: ['illusion', 'fear', 'subconscious', 'anxiety', 'confusion'],         reversed: ['release of fear', 'repressed emotion', 'inner confusion', 'clarity'] },
  { name: 'The Sun',            suit: 'Major Arcana', number: 19, upright: ['positivity', 'fun', 'warmth', 'success', 'vitality'],               reversed: ['negativity', 'depression', 'sadness', 'excessive optimism'] },
  { name: 'Judgement',          suit: 'Major Arcana', number: 20, upright: ['judgement', 'rebirth', 'inner calling', 'absolution'],              reversed: ['self-doubt', 'inner critic', 'ignoring the call', 'self-loathing'] },
  { name: 'The World',          suit: 'Major Arcana', number: 21, upright: ['completion', 'integration', 'accomplishment', 'travel', 'success'], reversed: ['incompletion', 'no closure', 'stagnation', 'delays'] },

  // ── Cups ─────────────────────────────────────────────────────────────────
  { name: 'Ace of Cups',      suit: 'Cups', number: 1,  upright: ['love', 'new relationships', 'compassion', 'creativity'],          reversed: ['blocked creativity', 'emptiness', 'repressed emotions', 'pain'] },
  { name: 'Two of Cups',      suit: 'Cups', number: 2,  upright: ['unity', 'partnership', 'attraction', 'mutual respect'],           reversed: ['imbalance', 'broken communication', 'tension', 'separation'] },
  { name: 'Three of Cups',    suit: 'Cups', number: 3,  upright: ['celebration', 'friendship', 'creativity', 'community'],           reversed: ['overindulgence', 'gossip', 'isolation', 'excess'] },
  { name: 'Four of Cups',     suit: 'Cups', number: 4,  upright: ['meditation', 'contemplation', 'apathy', 'reevaluation'],          reversed: ['retreat', 'withdrawal', 'checking in', 'new perspective'] },
  { name: 'Five of Cups',     suit: 'Cups', number: 5,  upright: ['regret', 'failure', 'disappointment', 'pessimism'],               reversed: ['personal setbacks', 'self-forgiveness', 'moving on', 'acceptance'] },
  { name: 'Six of Cups',      suit: 'Cups', number: 6,  upright: ['revisiting the past', 'childhood memories', 'innocence', 'nostalgia'], reversed: ['stuck in the past', 'naivety', 'unrealistic', 'lack of direction'] },
  { name: 'Seven of Cups',    suit: 'Cups', number: 7,  upright: ['opportunities', 'choices', 'wishful thinking', 'illusion'],       reversed: ['alignment', 'personal values', 'clarity', 'focused vision'] },
  { name: 'Eight of Cups',    suit: 'Cups', number: 8,  upright: ['disappointment', 'abandonment', 'withdrawal', 'escapism'],        reversed: ['hopelessness', 'aimless drifting', 'resignation', 'returning'] },
  { name: 'Nine of Cups',     suit: 'Cups', number: 9,  upright: ['contentment', 'satisfaction', 'gratitude', 'wish fulfilled'],     reversed: ['materialism', 'dissatisfaction', 'indulgence', 'inner happiness'] },
  { name: 'Ten of Cups',      suit: 'Cups', number: 10, upright: ['harmony', 'happiness', 'family', 'divine love', 'fulfillment'],   reversed: ['disruption', 'broken family', 'misalignment', 'disharmony'] },
  { name: 'Page of Cups',     suit: 'Cups', number: 11, upright: ['creativity', 'intuition', 'sensitivity', 'new ideas'],             reversed: ['emotional immaturity', 'creative block', 'insecurity', 'escapism'] },
  { name: 'Knight of Cups',   suit: 'Cups', number: 12, upright: ['creativity', 'romance', 'charm', 'imagination', 'beauty'],        reversed: ['unrealistic', 'jealousy', 'moodiness', 'disappointment'] },
  { name: 'Queen of Cups',    suit: 'Cups', number: 13, upright: ['compassion', 'calm', 'comfort', 'intuition', 'inner feelings'],   reversed: ['martyrdom', 'insecurity', 'dependence', 'emotional immaturity'] },
  { name: 'King of Cups',     suit: 'Cups', number: 14, upright: ['emotional balance', 'control', 'generosity', 'compassion'],       reversed: ['emotional manipulation', 'moodiness', 'volatility', 'overwhelmed'] },

  // ── Pentacles ─────────────────────────────────────────────────────────────
  { name: 'Ace of Pentacles',    suit: 'Pentacles', number: 1,  upright: ['opportunity', 'prosperity', 'stability', 'security', 'new venture'], reversed: ['lost opportunity', 'greed', 'instability', 'bad investment'] },
  { name: 'Two of Pentacles',    suit: 'Pentacles', number: 2,  upright: ['balance', 'adaptability', 'time management', 'priorities'],         reversed: ['imbalance', 'overwhelmed', 'disorganized', 'overcommitted'] },
  { name: 'Three of Pentacles',  suit: 'Pentacles', number: 3,  upright: ['teamwork', 'collaboration', 'building', 'learning'],                reversed: ['discord', 'misalignment', 'working alone', 'apathy'] },
  { name: 'Four of Pentacles',   suit: 'Pentacles', number: 4,  upright: ['security', 'control', 'conservatism', 'possessiveness'],            reversed: ['generosity', 'giving', 'spending', 'financial insecurity'] },
  { name: 'Five of Pentacles',   suit: 'Pentacles', number: 5,  upright: ['financial loss', 'poverty', 'lack mindset', 'isolation'],           reversed: ['recovery', 'charity', 'improvement', 'spiritual poverty'] },
  { name: 'Six of Pentacles',    suit: 'Pentacles', number: 6,  upright: ['giving', 'receiving', 'sharing', 'charity', 'generosity'],          reversed: ['debt', 'selfishness', 'imbalance of power', 'strings attached'] },
  { name: 'Seven of Pentacles',  suit: 'Pentacles', number: 7,  upright: ['hard work', 'perseverance', 'diligence', 'patience', 'results'],    reversed: ['lack of progress', 'procrastination', 'impatience', 'wasted effort'] },
  { name: 'Eight of Pentacles',  suit: 'Pentacles', number: 8,  upright: ['mastery', 'skill', 'dedication', 'craftsmanship', 'diligence'],     reversed: ['perfectionism', 'stagnation', 'no ambition', 'boredom'] },
  { name: 'Nine of Pentacles',   suit: 'Pentacles', number: 9,  upright: ['abundance', 'luxury', 'self-sufficiency', 'independence'],          reversed: ['financial setbacks', 'recklessness', 'living beyond means', 'overwork'] },
  { name: 'Ten of Pentacles',    suit: 'Pentacles', number: 10, upright: ['legacy', 'tradition', 'family', 'establishment', 'long-term success'], reversed: ['family disputes', 'bankruptcy', 'fleeting success', 'breaking tradition'] },
  { name: 'Page of Pentacles',   suit: 'Pentacles', number: 11, upright: ['opportunity', 'ambition', 'desire', 'diligence', 'new beginnings'],  reversed: ['lack of progress', 'procrastination', 'laziness', 'missed opportunity'] },
  { name: 'Knight of Pentacles', suit: 'Pentacles', number: 12, upright: ['efficiency', 'routine', 'conservatism', 'methodical', 'hard work'],  reversed: ['stagnation', 'boredom', 'laziness', 'obsessiveness'] },
  { name: 'Queen of Pentacles',  suit: 'Pentacles', number: 13, upright: ['practicality', 'creature comforts', 'nurturing', 'security'],        reversed: ['imbalance', 'self-centeredness', 'smothering', 'material obsession'] },
  { name: 'King of Pentacles',   suit: 'Pentacles', number: 14, upright: ['wealth', 'business', 'leadership', 'security', 'abundance'],         reversed: ['financially inept', 'obsessed with wealth', 'stubbornness', 'corruption'] },

  // ── Swords ────────────────────────────────────────────────────────────────
  { name: 'Ace of Swords',    suit: 'Swords', number: 1,  upright: ['clarity', 'breakthrough', 'new ideas', 'truth', 'sharp mind'],            reversed: ['confusion', 'chaos', 'lack of clarity', 'clouded thinking'] },
  { name: 'Two of Swords',    suit: 'Swords', number: 2,  upright: ['difficult decisions', 'indecision', 'stalemate', 'blocked emotions'],      reversed: ['indecision', 'confusion', 'information overload', 'no right choice'] },
  { name: 'Three of Swords',  suit: 'Swords', number: 3,  upright: ['heartbreak', 'grief', 'sorrow', 'rejection', 'painful truth'],             reversed: ['healing', 'forgiveness', 'recovery', 'moving forward'] },
  { name: 'Four of Swords',   suit: 'Swords', number: 4,  upright: ['rest', 'contemplation', 'passive action', 'retreat', 'recuperation'],      reversed: ['restlessness', 'burnout', 'stress', 'lack of rest'] },
  { name: 'Five of Swords',   suit: 'Swords', number: 5,  upright: ['conflict', 'defeat', 'winning at all costs', 'ambition'],                  reversed: ['reconciliation', 'forgiveness', 'past regrets', 'moving on'] },
  { name: 'Six of Swords',    suit: 'Swords', number: 6,  upright: ['transition', 'change', 'rite of passage', 'release', 'moving on'],         reversed: ['resistance to change', 'unfinished business', 'running away', 'stuck'] },
  { name: 'Seven of Swords',  suit: 'Swords', number: 7,  upright: ['betrayal', 'deception', 'strategy', 'acting alone', 'mental cunning'],     reversed: ['imposter syndrome', 'deceit', 'coming clean', 'confession'] },
  { name: 'Eight of Swords',  suit: 'Swords', number: 8,  upright: ['restriction', 'self-imposed limitations', 'imprisonment', 'powerless'],    reversed: ['freedom', 'self-acceptance', 'release', 'new perspective'] },
  { name: 'Nine of Swords',   suit: 'Swords', number: 9,  upright: ['anxiety', 'worry', 'fear', 'nightmares', 'despair'],                       reversed: ['inner turmoil', 'deep-seated fears', 'recovery', 'secret fears'] },
  { name: 'Ten of Swords',    suit: 'Swords', number: 10, upright: ['painful endings', 'deep wounds', 'betrayal', 'crisis', 'loss'],             reversed: ['recovery', 'regeneration', 'rising up', 'inevitable end'] },
  { name: 'Page of Swords',   suit: 'Swords', number: 11, upright: ['authority', 'new ideas', 'mental agility', 'thirst for knowledge'],        reversed: ['haste', 'scattered energy', 'reckless', 'all talk no action'] },
  { name: 'Knight of Swords', suit: 'Swords', number: 12, upright: ['ambition', 'action', 'drive', 'fearlessness', 'intellectual force'],       reversed: ['scattered energy', 'recklessness', 'impulsiveness', 'burn out'] },
  { name: 'Queen of Swords',  suit: 'Swords', number: 13, upright: ['independence', 'clear thinking', 'intellect', 'fairness', 'truth'],        reversed: ['cold-hearted', 'cruel', 'bitterness', 'pessimistic'] },
  { name: 'King of Swords',   suit: 'Swords', number: 14, upright: ['mental clarity', 'intellectual power', 'authority', 'truth', 'ethics'],    reversed: ['manipulative', 'tyrannical', 'abusive power', 'coldness'] },

  // ── Wands ─────────────────────────────────────────────────────────────────
  { name: 'Ace of Wands',    suit: 'Wands', number: 1,  upright: ['inspiration', 'new opportunities', 'growth', 'potential', 'spark'],         reversed: ['lack of energy', 'delays', 'missed opportunity', 'creative block'] },
  { name: 'Two of Wands',    suit: 'Wands', number: 2,  upright: ['planning', 'making decisions', 'leaving home', 'future vision'],             reversed: ['fear of unknown', 'indecision', 'playing safe', 'no drive'] },
  { name: 'Three of Wands',  suit: 'Wands', number: 3,  upright: ['progress', 'expansion', 'foresight', 'overseas', 'looking ahead'],           reversed: ['obstacles', 'delays', 'frustration', 'narrow vision'] },
  { name: 'Four of Wands',   suit: 'Wands', number: 4,  upright: ['celebration', 'joy', 'harmony', 'homecoming', 'community'],                  reversed: ['personal celebration', 'transition', 'lack of harmony', 'conflict'] },
  { name: 'Five of Wands',   suit: 'Wands', number: 5,  upright: ['disagreement', 'competition', 'conflict', 'diversity', 'strife'],            reversed: ['avoiding conflict', 'tension', 'personal struggle', 'compromise'] },
  { name: 'Six of Wands',    suit: 'Wands', number: 6,  upright: ['success', 'victory', 'public recognition', 'progress', 'confidence'],        reversed: ['private achievement', 'fall from grace', 'self-doubt', 'egotism'] },
  { name: 'Seven of Wands',  suit: 'Wands', number: 7,  upright: ['challenge', 'competition', 'standing firm', 'defending territory'],          reversed: ['overwhelmed', 'defeated', 'yielding', 'giving up'] },
  { name: 'Eight of Wands',  suit: 'Wands', number: 8,  upright: ['movement', 'fast action', 'quick decisions', 'air travel', 'momentum'],      reversed: ['delays', 'frustration', 'resisting change', 'slowing down'] },
  { name: 'Nine of Wands',   suit: 'Wands', number: 9,  upright: ['resilience', 'courage', 'persistence', 'test of faith', 'last stand'],       reversed: ['exhaustion', 'fatigue', 'questioning goals', 'defensiveness'] },
  { name: 'Ten of Wands',    suit: 'Wands', number: 10, upright: ['burden', 'extra responsibility', 'completion', 'hardworking'],                reversed: ['unable to delegate', 'overwhelmed', 'collapse', 'burnout'] },
  { name: 'Page of Wands',   suit: 'Wands', number: 11, upright: ['enthusiasm', 'exploration', 'discovery', 'free spirit', 'creative spark'],   reversed: ['lack of energy', 'immaturity', 'carelessness', 'hasty'] },
  { name: 'Knight of Wands', suit: 'Wands', number: 12, upright: ['energy', 'passion', 'inspired action', 'adventure', 'impulsiveness'],        reversed: ['passion project', 'scattered energy', 'reckless', 'delays'] },
  { name: 'Queen of Wands',  suit: 'Wands', number: 13, upright: ['courage', 'confidence', 'independence', 'social butterfly', 'charisma'],     reversed: ['self-doubt', 'manipulation', 'jealousy', 'demanding'] },
  { name: 'King of Wands',   suit: 'Wands', number: 14, upright: ['natural leader', 'vision', 'entrepreneur', 'honour', 'bold'],                reversed: ['domineering', 'vain', 'impulsive', 'unrealistic expectations'] },
];

const SPREAD_LABELS = ['What you need to know', 'New perspective', 'Action to take'];

const SUIT_SYMBOL = { 'Major Arcana': '★', Cups: '◎', Pentacles: '✦', Swords: '✝', Wands: '⚡' };

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  // Auth
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('save-prompt');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Reading flow
  const [appState, setAppState] = useState('landing'); // landing | shuffling | revealing | revealed
  const [currentCards, setCurrentCards] = useState([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  // History & journal
  const [viewMode, setViewMode] = useState('draw'); // draw | history
  const [readings, setReadings] = useState([]);
  const [journalDraft, setJournalDraft] = useState('');
  const [savingReading, setSavingReading] = useState(false);
  const [expandedReadingId, setExpandedReadingId] = useState(null);
  const [editingJournalId, setEditingJournalId] = useState(null);
  const [editingJournalText, setEditingJournalText] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [historyFilter, setHistoryFilter] = useState({ startDate: '', endDate: '' });
  const [toast, setToast] = useState(null);

  // ── Auth init ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const initAuth = async () => {
      const { data: { session: s } } = await supabase.auth.getSession();
      setSession(s);
      setLoading(false);
    };
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) loadReadings();
    else setReadings([]);
  }, [session]);

  // ── Shuffle → Revealing timer ───────────────────────────────────────────────
  useEffect(() => {
    if (appState !== 'shuffling') return;
    const t = setTimeout(() => { setRevealedCount(0); setAppState('revealing'); }, 2500);
    return () => clearTimeout(t);
  }, [appState]);

  // ── Sequential card reveal ──────────────────────────────────────────────────
  useEffect(() => {
    if (appState !== 'revealing') return;
    if (revealedCount >= 3) {
      const t = setTimeout(() => setAppState('revealed'), 600);
      return () => clearTimeout(t);
    }
    const delay = revealedCount === 0 ? 400 : 800;
    const t = setTimeout(() => setRevealedCount(c => c + 1), delay);
    return () => clearTimeout(t);
  }, [appState, revealedCount]);

  // ── Close user dropdown on outside click ───────────────────────────────────
  useEffect(() => {
    if (!showUserMenu) return;
    const handler = () => setShowUserMenu(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [showUserMenu]);

  // ── Toast helper ────────────────────────────────────────────────────────────
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Card drawing ────────────────────────────────────────────────────────────
  const drawNewCards = () => {
    const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
    setCurrentCards(
      shuffled.slice(0, 3).map(c => ({ ...c, orientation: Math.random() > 0.5 ? 'UPRIGHT' : 'REVERSED' }))
    );
    setJournalDraft('');
    setActiveCarouselIndex(0);
    setAppState('shuffling');
  };

  // ── Auth handlers ───────────────────────────────────────────────────────────
  const openAuthModal = (mode) => {
    setAuthError(''); setResetEmailSent(false); setEmail(''); setPassword('');
    setAuthModalMode(mode); setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false); setAuthError(''); setResetEmailSent(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault(); setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setAuthError(error.message); return; }
    closeAuthModal();
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); setAuthError('');
    if (password.length < 8) { setAuthError('Password must be at least 8 characters.'); return; }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) { setAuthError(error.message); return; }
    showToast('Account created! Please sign in.'); closeAuthModal();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setReadings([]); setViewMode('draw'); setShowUserMenu(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault(); setAuthError('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
    if (error) { setAuthError(error.message); return; }
    setResetEmailSent(true);
  };

  // ── Readings CRUD ───────────────────────────────────────────────────────────
  const loadReadings = async () => {
    const { data } = await supabase.from('readings').select('*').order('created_at', { ascending: false });
    setReadings(data || []);
  };

  const saveReading = async () => {
    if (!currentCards.length || !session?.user) return;
    setSavingReading(true);
    const { error } = await supabase.from('readings').insert([{
      user_id: session.user.id,
      card_1: currentCards[0].name, card_1_orientation: currentCards[0].orientation,
      card_2: currentCards[1].name, card_2_orientation: currentCards[1].orientation,
      card_3: currentCards[2].name, card_3_orientation: currentCards[2].orientation,
      notes: journalDraft || null,
    }]);
    setSavingReading(false);
    if (error) { showToast('Error saving reading.', 'error'); return; }
    showToast('Reading saved!'); setJournalDraft(''); loadReadings();
  };

  const updateJournalEntry = async (id, text) => {
    const { error } = await supabase.from('readings').update({ notes: text }).eq('id', id);
    if (!error) { showToast('Journal saved.'); setEditingJournalId(null); loadReadings(); }
  };

  const deleteReading = async () => {
    const { error } = await supabase.from('readings').delete().eq('id', deleteConfirmId);
    setDeleteConfirmId(null);
    if (!error) { showToast('Reading deleted.'); loadReadings(); }
    else showToast('Error deleting.', 'error');
  };

  const filteredReadings = readings.filter(r => {
    const d = new Date(r.created_at);
    if (historyFilter.startDate && d < new Date(historyFilter.startDate)) return false;
    if (historyFilter.endDate && d > new Date(historyFilter.endDate + 'T23:59:59')) return false;
    return true;
  });

  // ── Card back (CSS-only ornate design) ──────────────────────────────────────
  const CardBack = () => (
    <div className="card-back-design">
      <div className="card-back-grid">
        {Array.from({ length: 24 }).map((_, i) => <div key={i} className="card-back-cell" />)}
      </div>
      <div className="card-back-icon">✦</div>
    </div>
  );

  // ── Card placeholder (CSS-only art) ─────────────────────────────────────────
  const CardPlaceholder = ({ card }) => (
    <div className={`card-placeholder ${card.orientation === 'REVERSED' ? 'card-reversed' : ''}`}>
      <div className="card-placeholder-suit-symbol">{SUIT_SYMBOL[card.suit]}</div>
      <div className="card-placeholder-name">{card.name}</div>
      <div className="card-placeholder-suit">{card.suit}</div>
      <div className="card-placeholder-suit-symbol bottom">{SUIT_SYMBOL[card.suit]}</div>
    </div>
  );

  // ── Single card column (flip container + info) ───────────────────────────────
  const CardColumn = ({ card, index }) => {
    const isFlipped = revealedCount > index;
    const keywords = card.orientation === 'UPRIGHT' ? card.upright : card.reversed;
    return (
      <div className="card-column">
        <div className="card-spread-label">{SPREAD_LABELS[index]}</div>
        <div className="card-flip-container">
          <div className={`card-flip-inner${isFlipped ? ' flipped' : ''}`}>
            <div className="card-face card-face-back"><CardBack /></div>
            <div className="card-face card-face-front"><CardPlaceholder card={card} /></div>
          </div>
        </div>
        {isFlipped && (
          <div className="card-info">
            <div className="card-info-name">{card.name}</div>
            <span className={`orientation-badge ${card.orientation === 'UPRIGHT' ? 'badge-upright' : 'badge-reversed'}`}>
              {card.orientation}
            </span>
            <div className="card-keywords">
              {keywords.map((kw, i) => <span key={i} className="keyword-tag">{kw}</span>)}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── Screens ─────────────────────────────────────────────────────────────────
  const renderLanding = () => (
    <div className="landing-screen">
      <div className="landing-content">
        <h1 className="landing-headline">CLICK THE DECK &amp; REVEAL YOUR FATE</h1>
        <p className="landing-subtitle">Channel your energy into the deck. The universe is listening.</p>
        <div className="deck-wrapper" onClick={drawNewCards} title="Click to draw">
          <div className="deck-shadow deck-shadow-3" />
          <div className="deck-shadow deck-shadow-2" />
          <div className="deck-shadow deck-shadow-1" />
          <div className="deck-main">
            <CardBack />
          </div>
        </div>
        <p className="deck-hint">Click the deck to begin</p>
      </div>
    </div>
  );

  const renderShuffling = () => (
    <div className="shuffling-screen">
      <div className="shuffling-content">
        <h1 className="landing-headline">THE UNIVERSE IS THINKING...</h1>
        <p className="landing-subtitle">Stay focused. Keep your energy steady and mind clear.</p>
        <div className="shuffle-cards-area">
          <div className="shuffle-card shuffle-card-1"><CardBack /></div>
          <div className="shuffle-card shuffle-card-2"><CardBack /></div>
          <div className="shuffle-card shuffle-card-3"><CardBack /></div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="results-screen">
      <div className="results-content">
        {appState === 'revealed' && (
          <>
            <h1 className="results-headline">YOUR FATE IS REVEALED</h1>
            <p className="results-subtitle">What is the universe trying to tell you? What do you need to hear right now?</p>
          </>
        )}

        {/* Desktop: 3 cards side by side */}
        <div className="cards-desktop">
          {currentCards.map((card, i) => (
            <CardColumn key={i} card={card} index={i} />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="cards-mobile">
          <div className="carousel-outer">
            <div
              className="carousel-track"
              style={{ transform: `translateX(calc(50vw - ${activeCarouselIndex * 220 + 110}px))` }}
            >
              {currentCards.map((card, i) => (
                <div key={i} className={`carousel-slide${i === activeCarouselIndex ? ' active' : ''}`}>
                  <div className="card-flip-container">
                    <div className={`card-flip-inner${revealedCount > i ? ' flipped' : ''}`}>
                      <div className="card-face card-face-back"><CardBack /></div>
                      <div className="card-face card-face-front"><CardPlaceholder card={card} /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-controls">
            <button className="carousel-arrow" onClick={() => setActiveCarouselIndex(i => (i + 2) % 3)}>◀</button>
            <div className="carousel-dots">
              {[0, 1, 2].map(i => (
                <button key={i} className={`carousel-dot${i === activeCarouselIndex ? ' active' : ''}`}
                  onClick={() => setActiveCarouselIndex(i)} />
              ))}
            </div>
            <button className="carousel-arrow" onClick={() => setActiveCarouselIndex(i => (i + 1) % 3)}>▶</button>
          </div>

          {currentCards[activeCarouselIndex] && revealedCount > activeCarouselIndex && (
            <div className="carousel-info">
              <div className="card-spread-label">{SPREAD_LABELS[activeCarouselIndex]}</div>
              <div className="card-info-name">{currentCards[activeCarouselIndex].name}</div>
              <span className={`orientation-badge ${currentCards[activeCarouselIndex].orientation === 'UPRIGHT' ? 'badge-upright' : 'badge-reversed'}`}>
                {currentCards[activeCarouselIndex].orientation}
              </span>
              <div className="card-keywords">
                {(currentCards[activeCarouselIndex].orientation === 'UPRIGHT'
                  ? currentCards[activeCarouselIndex].upright
                  : currentCards[activeCarouselIndex].reversed
                ).map((kw, i) => <span key={i} className="keyword-tag">{kw}</span>)}
              </div>
            </div>
          )}
        </div>

        {appState === 'revealed' && (
          <div className="results-actions">
            <button className="btn-primary" onClick={drawNewCards}>SHUFFLE &amp; DRAW AGAIN</button>
            {session ? (
              <div className="save-section">
                <textarea
                  className="journal-textarea"
                  placeholder="Add a journal entry about this reading (optional)..."
                  value={journalDraft}
                  onChange={e => setJournalDraft(e.target.value)}
                  rows={3}
                />
                <button className="btn-success" onClick={saveReading} disabled={savingReading}>
                  {savingReading ? 'SAVING...' : 'SAVE READING'}
                </button>
              </div>
            ) : (
              <button className="btn-secondary" onClick={() => openAuthModal('save-prompt')}>SAVE THIS READING</button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="history-screen">
      <div className="history-content">
        <h2 className="section-title">MY READINGS</h2>

        <div className="history-filter">
          <label className="filter-label">FROM</label>
          <input type="date" className="filter-date" value={historyFilter.startDate}
            onChange={e => setHistoryFilter(f => ({ ...f, startDate: e.target.value }))} />
          <label className="filter-label">TO</label>
          <input type="date" className="filter-date" value={historyFilter.endDate}
            onChange={e => setHistoryFilter(f => ({ ...f, endDate: e.target.value }))} />
          {(historyFilter.startDate || historyFilter.endDate) && (
            <button className="btn-text" onClick={() => setHistoryFilter({ startDate: '', endDate: '' })}>Clear</button>
          )}
        </div>

        {filteredReadings.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state-text">{readings.length === 0 ? 'No saved readings yet.' : 'No readings match your filter.'}</p>
            <button className="btn-primary" onClick={() => setViewMode('draw')}>DRAW YOUR FIRST CARDS</button>
          </div>
        ) : (
          <div className="readings-list">
            {filteredReadings.map(reading => {
              const isExpanded = expandedReadingId === reading.id;
              const isEditing = editingJournalId === reading.id;
              const preview = reading.notes ? reading.notes.slice(0, 50) + (reading.notes.length > 50 ? '…' : '') : null;

              return (
                <div key={reading.id} className={`reading-entry${isExpanded ? ' expanded' : ''}`}>
                  <div className="reading-entry-header" onClick={() => setExpandedReadingId(isExpanded ? null : reading.id)}>
                    <div className="reading-entry-meta">
                      <span className="reading-date">
                        {new Date(reading.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <button className="btn-icon-danger" title="Delete"
                        onClick={e => { e.stopPropagation(); setDeleteConfirmId(reading.id); }}>✕</button>
                    </div>
                    <div className="reading-cards-row">
                      {[1, 2, 3].map(n => (
                        <React.Fragment key={n}>
                          <div className="reading-card-chip">
                            <span className="chip-name">{reading[`card_${n}`]}</span>
                            {reading[`card_${n}_orientation`] && (
                              <span className={`mini-badge ${reading[`card_${n}_orientation`] === 'UPRIGHT' ? 'badge-upright' : 'badge-reversed'}`}>
                                {reading[`card_${n}_orientation`][0]}
                              </span>
                            )}
                          </div>
                          {n < 3 && <span className="chip-arrow">→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    {preview && !isExpanded && <p className="journal-preview">{preview}</p>}
                    <span className="expand-chevron">{isExpanded ? '▲' : '▼'}</span>
                  </div>

                  {isExpanded && (
                    <div className="reading-entry-body">
                      <div className="journal-section-title">JOURNAL ENTRY</div>
                      {isEditing ? (
                        <div className="journal-edit">
                          <textarea className="journal-textarea" value={editingJournalText}
                            onChange={e => setEditingJournalText(e.target.value)} rows={5} autoFocus />
                          <div className="journal-edit-actions">
                            <button className="btn-primary btn-sm"
                              onClick={() => updateJournalEntry(reading.id, editingJournalText)}>SAVE</button>
                            <button className="btn-secondary btn-sm"
                              onClick={() => setEditingJournalId(null)}>CANCEL</button>
                          </div>
                        </div>
                      ) : (
                        <div className="journal-view">
                          {reading.notes
                            ? <p className="journal-text">{reading.notes}</p>
                            : <p className="journal-empty">No journal entry yet.</p>}
                          <button className="btn-secondary btn-sm"
                            onClick={() => { setEditingJournalId(reading.id); setEditingJournalText(reading.notes || ''); }}>
                            {reading.notes ? 'EDIT ENTRY' : '+ ADD ENTRY'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const renderAuthModal = () => {
    const isSavePrompt = authModalMode === 'save-prompt';
    const isSignIn = authModalMode === 'signin';
    const isSignUp = authModalMode === 'signup';
    const isForgot = authModalMode === 'forgot-password';

    return (
      <>
        <div className="modal-overlay" onClick={closeAuthModal} />
        <div className="modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={closeAuthModal}>✕</button>

          {isSavePrompt && (
            <>
              <h2 className="modal-title">SAVE YOUR READING</h2>
              <p className="modal-body">Create an account to save your readings and reflect over time.</p>
              <div className="modal-actions-col">
                <button className="btn-primary btn-full" onClick={() => setAuthModalMode('signup')}>CREATE ACCOUNT</button>
                <button className="btn-secondary btn-full" onClick={() => setAuthModalMode('signin')}>LOGIN</button>
                <button className="btn-text" onClick={closeAuthModal}>CONTINUE WITHOUT SAVING</button>
              </div>
            </>
          )}

          {(isSignIn || isSignUp) && (
            <>
              <div className="modal-tabs">
                <button className={`modal-tab${isSignIn ? ' active' : ''}`}
                  onClick={() => { setAuthModalMode('signin'); setAuthError(''); }}>SIGN IN</button>
                <button className={`modal-tab${isSignUp ? ' active' : ''}`}
                  onClick={() => { setAuthModalMode('signup'); setAuthError(''); }}>SIGN UP</button>
              </div>
              <form onSubmit={isSignIn ? handleSignIn : handleSignUp} className="auth-form">
                <label className="form-label">EMAIL</label>
                <input type="email" className="form-input" placeholder="your@email.com"
                  value={email} onChange={e => setEmail(e.target.value)} required />
                <label className="form-label">PASSWORD</label>
                <input type="password" className="form-input"
                  placeholder={isSignUp ? 'Min. 8 characters' : '••••••••'}
                  value={password} onChange={e => setPassword(e.target.value)} required />
                {authError && <p className="form-error">{authError}</p>}
                <button type="submit" className="btn-primary btn-full">
                  {isSignIn ? 'SIGN IN' : 'CREATE ACCOUNT'}
                </button>
                {isSignIn && (
                  <button type="button" className="btn-text"
                    onClick={() => { setAuthModalMode('forgot-password'); setAuthError(''); }}>
                    Forgot password?
                  </button>
                )}
              </form>
            </>
          )}

          {isForgot && (
            <>
              <h2 className="modal-title">RESET PASSWORD</h2>
              {resetEmailSent ? (
                <div>
                  <p className="modal-body">Check your email for a reset link. It expires in 24 hours.</p>
                  <button className="btn-secondary btn-full" onClick={() => setAuthModalMode('signin')}>BACK TO SIGN IN</button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="auth-form">
                  <p className="modal-body">Enter your email and we'll send you a reset link.</p>
                  <label className="form-label">EMAIL</label>
                  <input type="email" className="form-input" placeholder="your@email.com"
                    value={email} onChange={e => setEmail(e.target.value)} required />
                  {authError && <p className="form-error">{authError}</p>}
                  <button type="submit" className="btn-primary btn-full">SEND RESET LINK</button>
                  <button type="button" className="btn-text"
                    onClick={() => setAuthModalMode('signin')}>Back to sign in</button>
                </form>
              )}
            </>
          )}
        </div>
      </>
    );
  };

  // ── Initial loading ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="full-loading">
        <div className="loading-text">THE UNIVERSE IS THINKING...</div>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">✦ TAROT</div>

        <div className="navbar-links">
          {session && (
            <>
              <button className={`nav-link${viewMode === 'draw' ? ' active' : ''}`}
                onClick={() => setViewMode('draw')}>READINGS</button>
              <button className={`nav-link${viewMode === 'history' ? ' active' : ''}`}
                onClick={() => setViewMode('history')}>MY SPREADS</button>
            </>
          )}
        </div>

        <div className="navbar-auth">
          {!session ? (
            <button className="btn-login" onClick={() => openAuthModal('signin')}>LOGIN</button>
          ) : (
            <div className="user-menu-wrapper">
              <button className="user-menu-btn"
                onClick={e => { e.stopPropagation(); setShowUserMenu(v => !v); }}>
                {session.user.email.split('@')[0]} ▾
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <button className="dropdown-item"
                    onClick={() => { setViewMode('history'); setShowUserMenu(false); }}>MY READINGS</button>
                  <button className="dropdown-item dropdown-danger" onClick={handleSignOut}>LOGOUT</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="main-content">
        {viewMode === 'history' && session ? renderHistory() : (
          <>
            {appState === 'landing' && renderLanding()}
            {appState === 'shuffling' && renderShuffling()}
            {(appState === 'revealing' || appState === 'revealed') && renderResults()}
          </>
        )}
      </main>

      {/* Auth modal */}
      {showAuthModal && renderAuthModal()}

      {/* Delete confirm modal */}
      {deleteConfirmId && (
        <>
          <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)} />
          <div className="modal">
            <h2 className="modal-title">DELETE READING</h2>
            <p className="modal-body">Are you sure you want to delete this reading? This action cannot be undone.</p>
            <div className="modal-actions-row">
              <button className="btn-danger" onClick={deleteReading}>DELETE</button>
              <button className="btn-secondary" onClick={() => setDeleteConfirmId(null)}>CANCEL</button>
            </div>
          </div>
        </>
      )}

      {/* Toast */}
      {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
    </div>
  );
}

export default App;
