import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

const map: Record<string, ReactNode> = {}

export const WelcomeLayout: React.FC = () => {
  const location = useLocation()
  const outlet = useOutlet()
  // 缓存页面, 防止页面切换时重复渲染
  map[location.pathname] = outlet

  // 动画效果
  const transitions = useTransition(location.pathname, {
    // 进入状态 从屏幕右侧滑入至左侧
    from: { transform: 'translateX(100%)' },
    // 稳定状态
    enter: { transform: 'translateX(0%)' },
    // 离开状态 从屏幕左侧滑出至右侧
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 3000 },
  })

  return transitions((style, pathname) => {
    // 根据路径渲染不同的页面
    return (
    // 这里的animated.div组件会根据路由路径的变化而切换动画效果
      <animated.div key={pathname} style={style}>
        <div style={{ textAlign: 'center' }}>
          { map[pathname] }
        </div>
      </animated.div>
    )
  })
}
