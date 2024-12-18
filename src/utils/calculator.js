import questions from '../data/questions.json';

export function calculateResults(answers) {
  // 初始化各类别得分
  const categoryScores = {
    SWV: 0,
    IM: 0,
    T: 0,
    SR: 0
  };

  // 计算每个类别的得分
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = questions.questions.find(q => q.id === parseInt(questionId));
    if (question) {
      // 处理反向题
      const score = question.isReverse ? (6 - answer) : answer;
      categoryScores[question.category] += score;
    }
  });

  // 计算总分
  const totalScore = Object.values(categoryScores).reduce((a, b) => a + b, 0);
  const maxPossibleScore = 160; // 4个维度 * 8题 * 5分

  // 生成详细评价
  const evaluation = generateEvaluation(categoryScores);
  
  const analysis = generateDetailedAnalysis(categoryScores);
  const scoreLevels = {};
  Object.entries(categoryScores).forEach(([category, score]) => {
    scoreLevels[category] = getScoreLevel(score, questions.categories[category].maxScore);
  });

  return {
    categories: categoryScores,
    categoryDetails: questions.categories,
    totalScore,
    maxPossibleScore,
    evaluation,
    suggestions: generateSuggestions(categoryScores),
    analysis,
    scoreLevels,
    totalLevel: getScoreLevel(totalScore, maxPossibleScore)
  };
}

function generateEvaluation(scores) {
  let evaluation = "亲爱的灵魂，感谢您完成这次深度觉察之旅。让我们一起来看看这次评估为您揭示的内在图景：\n\n";
  
  // 自我价值感评价
  evaluation += "【内在价值觉察】\n";
  if (scores.SWV >= 32) {
    evaluation += "您展现出了强大的内在价值认同。这份自信和自我认可是您最珍贵的内在资产。您能够清晰地看到自己的价值和能力，这种健康的自我认知不仅能帮助您吸引与创造财富，更重要的是能让您在这个过程中保持内在的平静与力量。\n\n";
  } else if (scores.SWV >= 24) {
    evaluation += "您已经开始觉察并认可自己的内在价值，这是非常可贵的。虽然有时还会出现自我怀疑，但请记住，这些怀疑只是内在小孩的恐惧在说话。当这些声音出现时，请以温柔和理解的心态对待它们，同时提醒自己：您值得拥有一切美好的事物。\n\n";
  } else {
    evaluation += "亲爱的，从您的回答中，我感受到您可能正在经历一些自我价值感的挑战。这完全没有关系，这往往意味着您正处在一个重要的觉醒阶段。这是一个与内在自我建立更深连接的绝佳机会。请记住，您的价值从来不取决于外在的成就或他人的评价。\n\n";
  }

  // 内在动力评价
  evaluation += "【生命能量流动】\n";
  if (scores.IM >= 32) {
    evaluation += "您展现出强大的内在驱动力，这源于您与生命目标和使命的深度连接。这种发自内心的热情和动力是最珍贵的礼物，它不仅能带来财富，更能为您的人生旅程注入意义和喜悦。\n\n";
  } else if (scores.IM >= 24) {
    evaluation += "您已经开始觉察到内在的热情和使命感，这是一个美好的开始。当下的挑战是如何更深入地连接这份热情，让它成为您行动的持续动力。建议您通过冥想或静心来更清晰地倾听内心的声音。\n\n";
  } else {
    evaluation += "我注意到您可能正在寻找真正能让您心动的方向。这是一段珍贵的探索之旅。与其将注意力放在外在的目标上，不如先回到内在，重新连接您的心灵。当您找到内在的热情时，外在的动力自然会随之而来。\n\n";
  }

  // 信任感评价
  evaluation += "【宇宙信任连接】\n";
  if (scores.T >= 32) {
    evaluation += "您展现出对生命的深度信任，这是一份难得的智慧。您理解财富是宇宙能量的自然流动，并且相信只要保持开放和付出，丰盛自然会以最适合的方式来到您的生命中。这种觉知将为您打开更多意想不到的机会之门。\n\n";
  } else if (scores.T >= 24) {
    evaluation += "您正在建立与宇宙的信任连接，这是一个美好的过程。虽然有时还会感到不确定，但请记住，不确定性本身就是生命最大的礼物。它为我们打开了无限可能的大门。建议您通过感恩练习来加强这种信任连接。\n\n";
  } else {
    evaluation += "亲爱的，我感受到您可能正在经历一些关于信任的挑战。这是很多人在灵性成长道路上都会经历的阶段。请记住，宇宙总是站在您这一边，即使在看似困难的时刻，也在为您准备更美好的礼物。\n\n";
  }

  // 潜意识模式评价
  evaluation += "【潜意识模式转化】\n";
  if (scores.SR >= 32) {
    evaluation += "您已经很好地觉察并转化了来自原生家庭的限制性信念，这份觉知和智慧令人钦佩。您不仅理解了这些模式的来源，更懂得如何与之和平共处，这将持续支持您在财富道路上的成长。\n\n";
  } else if (scores.SR >= 24) {
    evaluation += "您已经开始觉察到一些深层的潜意识模式，这是转化的第一步。这些来自成长环境的限制性信念就像是旧时的保护机制，它们曾经保护过您，但现在是时候温柔地放下它们了。\n\n";
  } else {
    evaluation += "我感受到一些来自原生家庭的深层模式可能仍在影响着您。这些模式往往根植很深，需要我们带着极大的耐心和温柔去觉察和转化。请记住，觉察到这些模式本身就是一个重要的突破。\n\n";
  }

  // 总体建议
  evaluation += "【整体能量场评估】\n";
  const totalScore = scores.SWV + scores.IM + scores.T + scores.SR;
  if (totalScore >= 128) {
    evaluation += "从整体能量场来看，您已经建立了非常健康的财富意识结构。您不仅具备强大的内在力量，更重要的是，您已经开始理解财富的更深层意义 —— 它不仅是物质的积累，更是一种能量的流动和生命的表达。建议您继续保持这种觉知状态，同时考虑如何将这份智慧分享给更多需要的人。\n\n";
  } else if (totalScore >= 96) {
    evaluation += "您正处在一个很好的觉醒阶段。虽然在某些维度上还有提升的空间，但您已经建立了重要的觉知基础。接下来的旅程是要将这些觉知真正整合到您的日常生活中。建议您建立一些日常的觉察练习，比如晨间冥想或感恩日记，来加强这种整合。\n\n";
  } else {
    evaluation += "亲爱的，您正处在一个重要的转折点。这个阶段看似充满挑战，实际上是一个难得的礼物，因为它为真正的转变创造了条件。建议您先放下对外在结果的追求，将注意力转向内在。当内在的和谐建立起来，外在的丰盛自然会随之而来。\n\n";
  }

  return evaluation;
}

function generateSuggestions(scores) {
  const suggestions = [];
  
  // 自我价值感建议
  if (scores.SWV < 32) {
    suggestions.push({
      category: "SWV",
      title: "内在价值觉醒之旅",
      items: [
        "每天进行自我觉察冥想，感受内在的力量和价值",
        "建立感恩日记习惯，记录生命中的美好时刻",
        "练习与内在小孩对话，疗愈过去的自我否定",
        "参与支持性团体，与同行者分享成长历程"
      ]
    });
  }

  // 内在动力建议
  if (scores.IM < 32) {
    suggestions.push({
      category: "IM",
      title: "生命能量激活指引",
      items: [
        "通过冥想连接内在的生命使命和热情",
        "创建个人愿景板，可视化理想的生活图景",
        "寻找与高频能量场的人同行和交流",
        "建立晨间能量仪式，唤醒内在动力"
      ]
    });
  }

  // 信任感建议
  if (scores.T < 32) {
    suggestions.push({
      category: "T",
      title: "宇宙信任重建练习",
      items: [
        "每天记录三个宇宙给予的礼物和同步性",
        "练习放下控制，信任生命的完美安排",
        "建立丰盛意识冥想习惯",
        "参与能量疗愈或身心灵工作坊"
      ]
    });
  }

  // 潜意识模式转化建议
  if (scores.SR < 32) {
    suggestions.push({
      category: "SR",
      title: "潜意识模式转化之旅",
      items: [
        "进行内在小孩疗愈，释放童年的金钱创伤",
        "探索并重写限制性信念的根源故事",
        "通过能量按摩或身体工作释放积累的情绪",
        "建立新的金钱故事，创造健康的财富信念"
      ]
    });
  }
  
  return suggestions;
}

function getScoreLevel(score, maxScore) {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return { level: "能量场强大", color: "text-green-600" };
  if (percentage >= 60) return { level: "觉知在提升", color: "text-blue-600" };
  if (percentage >= 40) return { level: "需要疗愈", color: "text-yellow-600" };
  return { level: "等待觉醒", color: "text-red-600" };
}

function generateDetailedAnalysis(scores) {
  const analysis = {
    SWV: {
      strengths: [],
      weaknesses: [],
      opportunities: []
    },
    IM: {
      strengths: [],
      weaknesses: [],
      opportunities: []
    },
    T: {
      strengths: [],
      weaknesses: [],
      opportunities: []
    },
    SR: {
      strengths: [],
      weaknesses: [],
      opportunities: []
    }
  };

  // 自我价值感分析
  if (scores.SWV >= 32) {
    analysis.SWV.strengths.push(
      "您已经与内在的神圣价值建立了深度连接",
      "能够感受并表达自己独特的生命礼物",
      "对自己的价值和能力保持稳定的信任"
    );
    analysis.SWV.opportunities.push(
      "可以开始指引他人觉醒内在价值",
      "探索更深层的生命使命和表达"
    );
  } else if (scores.SWV >= 24) {
    analysis.SWV.strengths.push(
      "已经开始觉察内在的光芒",
      "在某些领域能感受到自己的力量"
    );
    analysis.SWV.weaknesses.push(
      "内在小孩偶尔会感到不安全和怀疑",
      "对外界评价仍有一定的依附"
    );
    analysis.SWV.opportunities.push(
      "深化与内在自我���对话和连接",
      "通过日常仪式强化自我认同"
    );
  } else {
    analysis.SWV.weaknesses.push(
      "经常怀疑自己的能力和价值",
      "容易受外界评价影响",
      "对成功缺乏信心"
    );
    analysis.SWV.opportunities.push(
      "开始温柔地觉察自我否定模式",
      "寻找专业的能量治疗师支持",
      "参加觉知提升工作坊"
    );
  }

  // 内在动力分析
  if (scores.IM >= 32) {
    analysis.IM.strengths.push(
      "您与内在生命能量保持着强大的连接",
      "能够倾听并跟随内心的智慧指引",
      "自然地活在当下的创造与流动中"
    );
    analysis.IM.opportunities.push(
      "可以成为他人的灵感与激励源泉",
      "探索更多元的生命表达方式",
      "创建能量共振场，吸引志同道合的伙伴"
    );
  } else if (scores.IM >= 24) {
    analysis.IM.strengths.push(
      "已经开始觉察内在的生命脉动",
      "能感受到自己独特的生命节奏"
    );
    analysis.IM.weaknesses.push(
      "与内在生命力的连接较弱",
      "容易被外在环境的能量影响",
      "难以持续投入没有即时回报的事情"
    );
    analysis.IM.opportunities.push(
      "加深与内在指南针的连接",
      "通过冥想提升能量频率",
      "在日常生活中保持觉知状态"
    );
  } else {
    analysis.IM.weaknesses.push(
      "与内在生命力的连接较弱",
      "容易被外在环境的能量影响",
      "对自己的直觉信任度不足"
    );
    analysis.IM.opportunities.push(
      "重新连接内在的生命源泉",
      "建立日常能量清理仪式",
      "寻找能量共振的支持团体"
    );
  }

  // 信任感分析
  if (scores.T >= 32) {
    analysis.T.strengths.push(
      "与宇宙能量场保持深度的信任连接",
      "能感受到生命的完美安排和时机",
      "活在丰盛意识和感恩状态中"
    );
    analysis.T.opportunities.push(
      "成为丰盛能量的传递者",
      "创造更多的能量交换机会",
      "指引他人体验宇宙的支持"
    );
  } else if (scores.T >= 24) {
    analysis.T.strengths.push(
      "开始感受宇宙的支持和引导",
      "对生命的神奇保持开放态度"
    );
    analysis.T.weaknesses.push(
      "与宇宙能量场的连接受阻",
      "容易陷入匮乏意识的漩涡",
      "对生命的信任需要修复"
    );
    analysis.T.opportunities.push(
      "加深与宇宙智慧的连接",
      "练习臣服和信任的能力",
      "觉察并转化恐惧能量"
    );
  } else {
    analysis.T.weaknesses.push(
      "与宇宙能量场的连接受阻",
      "容易陷入匮乏意识的漩涡",
      "对生命的信任需要修复"
    );
    analysis.T.opportunities.push(
      "通过冥想重建与宇宙的连接",
      "记录和感恩同步性时刻",
      "参与能量场疗愈工作"
    );
  }

  // 潜意识模式分析
  if (scores.SR >= 32) {
    analysis.SR.strengths.push(
      "已经觉醒并转化了深层的能量模式",
      "与内在小孩建立了爱的连接",
      "能够以觉知的状态面对阴影"
    );
    analysis.SR.opportunities.push(
      "指引他人进行内在小孩疗愈",
      "创造更深层的能量转化工具",
      "分享个人的疗愈旅程"
    );
  } else if (scores.SR >= 24) {
    analysis.SR.strengths.push(
      "开始觉察内在的能量阻塞",
      "愿意面对和拥抱阴影部分"
    );
    analysis.SR.weaknesses.push(
      "某些旧有的能量模式仍在运作",
      "与内在小孩的连接需要加强"
    );
    analysis.SR.opportunities.push(
      "深入探索家族系统的能量��景",
      "进行更多的内在小孩对话",
      "参与系统排列或能量疗愈"
    );
  } else {
    analysis.SR.weaknesses.push(
      "存在较深的能量阻塞和创伤",
      "内在小孩仍处于受伤状态",
      "家族系统的能量需要梳理"
    );
    analysis.SR.opportunities.push(
      "开始温柔地觉察内在创伤",
      "寻找专业的能量治疗师支持",
      "建立安全的疗愈容器"
    );
  }

  return analysis;
} 