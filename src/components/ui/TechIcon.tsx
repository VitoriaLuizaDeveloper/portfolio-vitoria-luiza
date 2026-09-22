import {
  SiReact,
  SiReactHex,
  SiNextdotjs,
  SiNextdotjsHex,
  SiTypescript,
  SiTypescriptHex,
  SiJavascript,
  SiJavascriptHex,
  SiHtml5,
  SiHtml5Hex,
  SiNodedotjs,
  SiNodedotjsHex,
  SiPhp,
  SiPhpHex,
  SiLaravel,
  SiLaravelHex,
  SiCodeigniter,
  SiCodeigniterHex,
  SiRabbitmq,
  SiRabbitmqHex,
  SiMysql,
  SiMysqlHex,
  SiPostgresql,
  SiPostgresqlHex,
  SiGrafana,
  SiGrafanaHex,
  SiGit,
  SiGitHex,
  SiClaude,
  SiClaudeHex,
  SiCursor,
  SiCursorHex,
  SiCypress,
  SiCypressHex,
  SiWordpress,
  SiWordpressHex,
} from "@icons-pack/react-simple-icons";

const rules = [
  { test: /^react$/i, Icon: SiReact, color: SiReactHex },
  { test: /^next\.js$/i, Icon: SiNextdotjs, color: SiNextdotjsHex },
  { test: /^typescript$/i, Icon: SiTypescript, color: SiTypescriptHex },
  { test: /^javascript$/i, Icon: SiJavascript, color: SiJavascriptHex },
  { test: /html5/i, Icon: SiHtml5, color: SiHtml5Hex },
  { test: /^node\.js$/i, Icon: SiNodedotjs, color: SiNodedotjsHex },
  { test: /^php$/i, Icon: SiPhp, color: SiPhpHex },
  { test: /^laravel$/i, Icon: SiLaravel, color: SiLaravelHex },
  { test: /^codeigniter$/i, Icon: SiCodeigniter, color: SiCodeigniterHex },
  { test: /rabbitmq/i, Icon: SiRabbitmq, color: SiRabbitmqHex },
  { test: /^mysql$/i, Icon: SiMysql, color: SiMysqlHex },
  { test: /^postgresql$/i, Icon: SiPostgresql, color: SiPostgresqlHex },
  { test: /grafana/i, Icon: SiGrafana, color: SiGrafanaHex },
  { test: /^git$/i, Icon: SiGit, color: SiGitHex },
  { test: /claude/i, Icon: SiClaude, color: SiClaudeHex },
  { test: /^cursor$/i, Icon: SiCursor, color: SiCursorHex },
  { test: /^cypress$/i, Icon: SiCypress, color: SiCypressHex },
  { test: /^wordpress$/i, Icon: SiWordpress, color: SiWordpressHex },
];

export function getTechIcon(name: string) {
  const rule = rules.find((r) => r.test.test(name));
  return rule ? { Icon: rule.Icon, color: rule.color } : null;
}

export function TechIcon({ name, size = 14 }: { name: string; size?: number }) {
  const match = getTechIcon(name);
  if (!match) return null;
  const { Icon, color } = match;
  return <Icon size={size} color={color} className="shrink-0" />;
}
